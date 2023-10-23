import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { kv } from '@vercel/kv';
import { Ratelimit } from '@upstash/ratelimit';

const config = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export const runtime = 'edge';

export async function POST(req: Request): Promise<Response> {
  const ip = req.headers.get('x-forwarded-for');
  console.log(ip);
  const ratelimit = new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(100, '1 d'),
  });

  const { success, limit, reset, remaining } = await ratelimit.limit(
    `novel_ratelimit_${ip}`
  );

  if (!success) {
    return new Response('일일 자동완성 최대 사용량 50회를 초과하였습니다', {
      status: 429,
      headers: {
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': reset.toString(),
      },
    });
  }
  
  let { prompt } = await req.json();
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `You are a summary helper who summarizes the text. 
        The input value inclues title and contents. 
        The output format follows the tone of the text and outputs it in maximum two sentences in Korean. 
        If the input value contains the newline letter \n, don't bring it to the output value
        You don't answer except for two sentences that are summarized.`,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 0,
    stream: true,
    n: 1,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
