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
  if (
    process.env.KV_REST_API_URL &&
    process.env.KV_REST_API_TOKEN
  ) {
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
  }
  let { prompt } = await req.json();
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          `Your task is to extract two of the most important software-related keywords in the article. 
          The input value is a complex form of JSON, and you only focus on the value of the "text" key. 
          The output format is a JavaScript array containing strings, except for two special characters. 
          You don't answer except for the keyword arrangement.
          -------------------------
          The example input form is as follows.
          {"type": "doc", "content": [{"type": "paragraph"}, {"type": "heading", "attrs": {"level": 2}, "content": [{"text": "톱레벨 클래스는 한 파일에 하나만 담으라", "type": "text"}]}, {"type": "paragraph"}, {"type": "paragraph", "content": [{"text": "한 파일에 클래스를 여러 개 선언하면,", "type": "text"}]}, {"type": "bulletList", "attrs": {"tight": true}, "content": [{"type": "listItem", "content": [{"type": "paragraph", "content": [{"text": "소스 파일이 컴파일 되는 순서에 따라 동작이 다를 수 있다.", "type": "text"}]}]}, {"type": "listItem", "content": [{"type": "paragraph", "content": [{"text": "예시:", "type": "text"}]}, {"type": "codeBlock", "attrs": {"language": "java"}, "content": [{"text": "// 파일: MyClass.java\n\npublic class MyClass {\n    // 클래스 내용\n}\n\npublic class AnotherClass {\n    // 다른 클래스 내용\n}", "type": "text"}]}, {"type": "paragraph", "content": [{"text": " 위와 같은 파일이 있을 때, ", "type": "text"}, {"text": "AnotherClass.java", "type": "text", "marks": [{"type": "link", "attrs": {"href": "http://AnotherClass.java", "class": "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer", "target": "_blank"}}]}, {"text": " 파일을 만들어 또 다른 클래스를 정의한다면 예상치 못한 동작이 발생한다.", "type": "text"}]}]}]}, {"type": "paragraph"}, {"type": "paragraph", "content": [{"text": "따라서 톱레벨 클래스는 한 파일에 하나만 만들자.", "type": "text", "marks": [{"type": "bold"}]}]}, {"type": "paragraph", "content": [{"text": "굳이 여러 클래스를 하나의 파일에 담고 싶다면 정적 멤버 클래스를 활용하자.", "type": "text", "marks": [{"type": "bold"}]}]}, {"type": "paragraph"}]}
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
