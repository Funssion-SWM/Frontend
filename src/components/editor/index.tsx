'use client';

import { Editor, EditorContent } from '@tiptap/react';
import { EditorBubbleMenu } from './components';
import { ImageResizer } from './extensions/image-resizer';

export default function MyEditor({ editor }: { editor: Editor | null }) {
  return (
    <div
      onClick={() => {
        editor?.chain().focus().run();
      }}
      id="editor-content-area"
      className="relative w-full p-4 rounded-lg"
    >
      {editor && <EditorBubbleMenu editor={editor} />}
      {editor?.isActive('image') && <ImageResizer editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}
