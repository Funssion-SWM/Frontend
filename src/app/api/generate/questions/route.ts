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
  let { prompt } = await req.json();
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `You're a software-related interview question generator.
          Your task is to generate software-related interview questions for each of the three keywords
          Create 3 questions for 3 keywords and return them to js array
          Don't answer anything other than the question array. Please answer in Korean only
          -------------------------
          The example input form is as follows.
          keyword1: ... , keyword2: ... , keyword3: ...
          -------------------------
          The sample output form is as follows.
          [question1, question2, question3]`,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.5,
    top_p: 0.5,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    n: 1,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
