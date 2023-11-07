import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';

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
        content: `Your task is to extract two of the most important software-related keywords in the article. 
          The input value inclues title and contents. 
          The output format is a JavaScript array containing strings, except for two special characters. 
          You don't answer except for the keyword arrangement.
          -------------------------
          The example input form is as follows.
          title : ..., contents : ...
          -------------------------
          The sample output form is as follows.
          ["Nextjs", "자바"]`,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
    top_p: 1,
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
