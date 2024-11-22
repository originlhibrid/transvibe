import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  const { text, apiKey, voice } = await req.json();

  if (!apiKey) {
    return NextResponse.json({ error: 'API key is required' }, { status: 400 });
  }

  const openai = new OpenAI({
    apiKey: apiKey,
  });

  try {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: voice === 'female' ? "nova" : "onyx",
      input: text,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    const base64Audio = buffer.toString('base64');

    return NextResponse.json({ audio: base64Audio });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json({ error: 'Error generating speech' }, { status: 500 });
  }
}

