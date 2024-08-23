import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

const systemPrompt = `Objective:
You are a helpful and informative agent that assists students in finding the best 
professors based on their specific needs. You will utilize a knowledge base of 
professor reviews and ratings to provide personalized recommendations.

Instructions:
1. Understand the User's Query: Carefully analyze the user's question to identify their
 specific requirements. For example, "What are the best professors for CS 101?" or 
 "Which professor is good for students who need extra help?"

2. Retrieve Relevant Information: Access the knowledge base of professor reviews and 
ratings to identify professors who match the user's criteria.

3. Rank Professors: Based on the information retrieved, rank the top 3 professors for 
the user's query. Take into account factors like:
    - Professor's overall rating
    - Specific skills or teaching styles
    - Availability of office hours
    - Course difficulty

4. Provide a Concise and Informative Response: Present the top 3 professors with a 
brief explanation of why they were chosen for the user's query. Include key information 
from their reviews to help the student make an informed decision.
Example Interaction:
    User: "Which professor is the best for CS 101, and who is known to be helpful with 
          office hours?"
    Agent: "Based on your query, here are the top 3 professors for CS 101 known for 
          being helpful during office hours:
    Professor A: Rated 4.8 stars with students praising their clear explanations and 
          willingness to help during office hours.
    Professor B: Has a 4.5-star rating and students appreciate their approachable 
          demeanor and availability for extra support.
    Professor C: Rated 4.3 stars with positive feedback about their in-depth lectures 
          and regular office hours."

Remember:
Be polite and helpful.
Provide accurate and relevant information.
Keep your responses concise and easy to understand.
Use RAG (Retrieval Augmented Generation) to access the knowledge base of professor reviews.`;


// This can be broken down into three parts:
export async function POST(request) {
  // 1. Read data from the request
  const data = await request.json();
  const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });
  const index = pc.index("rag").namespace("ns1");
  const openai = new OpenAI()

  const text = data[data.length - 1].content;
  const embedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
    encoding_format: "float",
  });

  const results = await index.query({
    // 2. Make embedding query
    topK: 3,
    includeMetadata: true,
    vector: embedding.data[0].embedding,
  });

  let resultString =
    "\n\nReturned results from vector db (done automatically): ";
  results.matches.forEach((match) => {
    resultString += `\n
        Professor: ${match.id}
        Review: ${match.metadata.stars}
        Subject: ${match.metadata.subject}
        Stars: ${match.metadata.stars}
        \n\n
        `;
  });

  const lastMessage = data[data.length - 1]; // 3. Generate results from embedding
  const lastMessageContent = lastMessage.content + resultString;
  const lastDataWithoutLastMessage = data.slice(0, data.length - 1);

  const completion = await openai.chat.completions.create({
   
    messages: [
      { role: "system", content: systemPrompt },
      ...lastDataWithoutLastMessage,
      { role: "user", content: lastMessageContent },
    ],
    model: "gpt-4o",
    stream: true,
  });

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            const text = encoder.encode(content);
            controller.enqueue(text);
          }
        }
      } catch (error) {
        controller.error(error);
      } finally {
        controller.close();
      }
    },
  });

  return new NextResponse(stream);
}
