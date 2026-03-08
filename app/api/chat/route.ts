import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY, // pega do .env.local
});

export async function POST(req: Request) {
  const { message } = await req.json();
// tentando, tentando...
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // modelo válido e atual
      contents: [{ role: "user", parts: [{ text: message }] }],
    });

    // O SDK já traz o texto direto
    const reply = response.text || "Sem resposta da IA";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Erro na API Gemini:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
