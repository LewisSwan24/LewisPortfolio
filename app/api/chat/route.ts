import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// TODO: Replace in-memory rate limit with Upstash/Redis for multi-instance deploys.
const rateLimit = new Map<string, { count: number; reset: number }>();

const chatSchema = z.object({
  message: z.string().min(1).max(2000),
});

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]!.trim();
  return req.headers.get('x-real-ip')?.trim() ?? 'anonymous';
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const now = Date.now();
  const windowMs = 60 * 1000;

  const data = rateLimit.get(ip) || { count: 0, reset: now + windowMs };
  if (now > data.reset) {
    data.count = 0;
    data.reset = now + windowMs;
  }

  if (data.count >= 10) {
    return new NextResponse('Too many requests', { status: 429 });
  }

  data.count++;
  rateLimit.set(ip, data);

  let message: string;
  try {
    const body = await req.json();
    message = chatSchema.parse(body).message;
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ errors: err.flatten().fieldErrors }, { status: 400 });
    }
    return new NextResponse('Invalid request', { status: 400 });
  }

  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey) {
    return new NextResponse('Chat service not configured', { status: 503 });
  }

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        role: 'user',
        parts: [{ text: message }],
      }],
      system_instruction: {
        parts: [{ text: "You are Lewis's AI portfolio assistant. Answer questions about his skills (React, Next.js, TypeScript, Python), projects, and experience. For unrelated topics, politely redirect." }]
      }
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Gemini API Error:', errorText);
    return new NextResponse('Chat API Error', { status: response.status });
  }

  if (!response.body) return new NextResponse('Internal Error', { status: 500 });

  const reader = response.body.getReader();
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      try {
        let buffer = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          buffer += decoder.decode(value, { stream: true });
          
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';
          
          for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('data: ')) {
              const jsonStr = trimmedLine.slice(6);
              try {
                const json = JSON.parse(jsonStr);
                const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
                if (text) {
                  controller.enqueue(encoder.encode(text));
                }
              } catch (e) {
                // Ignore incomplete or invalid JSON
              }
            }
          }
        }
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    }
  });

  return new NextResponse(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}
