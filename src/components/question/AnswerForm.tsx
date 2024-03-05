import { EditorContent, useEditor } from '@tiptap/react';
import { handleTiptapExtensions } from '@/lib/editor/extensions';
import { handleTiptapEditorProps } from '@/lib/editor/props';
import BlueBtn from '../shared/btn/BlueBtn';
import { createAnswer } from '@/service/answers';
import { useRouter } from 'next/navigation';
import { notifyToast } from '@/utils/notify';
import { EditorBubbleMenu } from '@/lib/editor/components';

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
    <div className="mx-2 my-10 sm:mx-0">
      <div className="flex items-center justify-between my-2">
        <p className="font-semibold sm:text-xl text-soma-grey-60">답변 작성</p>
        <BlueBtn
          text="등록"
          onClick={() => {
            if (editor?.getText().length === 0) {
              notifyToast('내용을 작성해주세요', 'warning');
              return;
            }

            const questionText = JSON.stringify(editor?.getJSON());
            createAnswer(questionId, questionText).then((res) => {
              if ('code' in res) {
                if (res.code === 401) router.push('/login');
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
      <div className="h-72 overflow-y-auto border-[0.5px] border-soma-grey-49 rounded-2xl p-3">
        {editor && <EditorBubbleMenu editor={editor} />}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
