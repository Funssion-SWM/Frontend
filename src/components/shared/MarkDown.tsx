'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Props = {
  text: string;
};

export default function MarkDown({ text }: Props) {
  return (
    <ReactMarkdown className="prose" remarkPlugins={[remarkGfm]}>
      {text}
    </ReactMarkdown>
  );
}
