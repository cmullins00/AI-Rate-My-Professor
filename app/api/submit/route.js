import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

export async function POST(request) {
  const { url } = await request.json();

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const professorName = $("div.NameTitle__Name-dowf0z-0").text().trim();
    const department = $("div.NameTitle__Title-dowf0z-1").text().trim();
    const stars = parseFloat(
      $("div.RatingValue__Numerator-qw8sqy-2").text().trim()
    );
    const reviewText = $("div.Comments__StyledComments-dzzyvm-0")
      .first()
      .text()
      .trim();

    console.log("Scraped data:", {
      professorName,
      department,
      stars,
      reviewText,
    });

    // insert to pinecone here

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error scraping data or inserting into Pinecone:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
