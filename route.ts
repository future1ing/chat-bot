import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const myApiKey = "AIzaSyB1aF_YuBfm2k7_J9jOhfZqYox0FKYJXu0"; 
    
    const genAI = new GoogleGenerativeAI(myApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(message);
    const response = await result.response;
    
    return NextResponse.json({ reply: response.text() });
  } catch (error: any) {
    return NextResponse.json({ reply: "Gemini Error: " + error.message }, { status: 500 });
  }
}
