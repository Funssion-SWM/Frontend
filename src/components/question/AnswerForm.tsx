import { EditorContent, useEditor } from '@tiptap/react';
import { handleTiptapExtensions } from '../editor/extensions';
import { handleTiptapEditorProps } from '../editor/props';
import BlueBtn from '../shared/btn/BlueBtn';
import { createAnswer } from '@/service/answers';
import { useRouter } from 'next/navigation';
import { notifyToast } from '@/service/notification';
import { EditorBubbleMenu } from '../editor/components';

type Props = {
  questionId: number;
};

export default function AnswerForm({ questionId }: Props) {
  const editor = useEditor({
    extensions: handleTiptapExtensions('answer', 0),
    editorProps: handleTiptapEditorProps('answer', 0),
  });
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-between items-center border-t-[0.5px] border-soma-grey-49 py-2">
        <p className="sm:text-xl font-medium ">답변 작성</p>
        <BlueBtn
          text="등록"
          onClick={() => {
            const questionText = JSON.stringify(editor?.getJSON());
            createAnswer(questionId, questionText).then((res) => {
              if (res.code) {
                notifyToast(res.message, 'error');
                return;
              }
              editor?.commands.setContent('');
              notifyToast(res.message, 'success');
              router.refresh();
            });
          }}
        />
      </div>
      <div className="h-72 overflow-y-scroll border-[0.5px] border-soma-grey-49 rounded-2xl p-3">
        {editor && <EditorBubbleMenu editor={editor} />}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
