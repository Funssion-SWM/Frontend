'use client';

import { TiptapExtensions } from '@/components/ui/editor/extensions';
import { TiptapEditorProps } from '@/components/ui/editor/props';
import { EditorContent, useEditor } from '@tiptap/react';

const exampleTitle = 'JS Promise란 무엇일까?';
const exampleContents = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: {
        level: 3,
      },
      content: [
        {
          type: 'text',
          text: 'JS Promise',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: '비동기 처리를 간편하게 해주는 Object',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 3,
      },
      content: [
        {
          type: 'text',
          text: 'Async / Await',
        },
      ],
    },
    {
      type: 'bulletList',
      attrs: {
        tight: true,
      },
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Clear style of using promise',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'promise를 감싸고 있는 syntatic sugar',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'codeBlock',
      attrs: {
        language: null,
      },
      content: [
        {
          type: 'text',
          text: "// Promise\nfunction getTomato(){\n\treturn delay(3000)\n\t.then(()=>return '🍅');\n}\n\n// await 이용해서 구현하기\nasync function getTomato(){\n\tawait delay(3000);\n\treturn '🍅'\n}",
        },
      ],
    },
  ],
};

export default function MemoPage() {
  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    editable: false,
    content: exampleContents,
  });
  return (
    <section className="flex flex-col">
      <div className="my-2 self-end">
        <button className=" bg-black text-white px-2 rounded-lg mx-1">
          수정하기
        </button>
        <button className=" bg-black text-white px-2 rounded-lg mx-1">
          삭제하기
        </button>
      </div>
      <div className="rounded-lg shadow-lg p-6 bg-yellow-100 my-2">
        <h1 className="text-4xl font-bold py-2 mb-5 bg-yellow-50">
          {exampleTitle}
        </h1>
        <EditorContent editor={editor} />
      </div>
    </section>
  );
}
