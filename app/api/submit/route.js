import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";
import reviewsData from "/reviews.json";

export async function POST(request) {
  const openai = new OpenAI();
  const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });

  const { url } = await request.json();

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const professorName = $("div.NameTitle__Name-dowf0z-0").text().trim();
    const subject = $("div.NameTitle__Title-dowf0z-1").text().trim();
    const stars = parseFloat(
      $("div.RatingValue__Numerator-qw8sqy-2").text().trim()
    );
    const reviewText = $("div.Comments__StyledComments-dzzyvm-0")
      .first()
      .text()
      .trim();

    console.log("Scraped data:", {
      professorName,
      subject,
      stars,
      reviewText,
    });

    console.log("Reviews:", reviewsData);

    // Push the new review data to the reviews array

    //create the embeddings
    const text = `${professorName} is a professor in the ${subject} department with an overall quality rating of ${stars} and here is a review on their teaching: ${reviewText}.`;
    const index = pc.Index("rag").namespace("ns1");

    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
      encoding_format: "float",
    });

    await index.upsert([
      {
        id: professorName,
        values: embedding.data[0].embedding,
        metadata: {
          subject,
          stars,
          reviewText,
        },
      },
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error scraping data or inserting into Pinecone:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
