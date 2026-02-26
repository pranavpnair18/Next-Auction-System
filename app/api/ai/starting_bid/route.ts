import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import pkg from "@google/generative-ai/package.json";
console.log("Using Google Generative AI SDK version:", pkg.version);


export async function POST(req: NextRequest) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
    console.log("API KEY:", process.env.GOOGLE_API_KEY);
      console.log("API base URL:", (genAI as any).client?.baseUrl);

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const data = await req.json();
    console.log("Received:", data);

    const prompt = data.params;
    console.log("Prompt:", prompt);

    const result = await model.generateContent(prompt);
    const response = result.response;
    const output = await response.text();

    return NextResponse.json({ output });
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return NextResponse.json({ error: "AI fetch failed" }, { status: 500 });
  }
}
