import { EditorContent, useEditor } from '@tiptap/react';
import { handleTiptapExtensions } from '../editor/extensions';
import { handleTiptapEditorProps } from '../editor/props';
import { Answer } from '@/types/answer';
import AnswerCardHeader from './AnswerCardHeader';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateAnswer } from '@/service/answers';
import { notifyToast } from '@/service/notification';

type Props = {
  answer: Answer;
};

export default function AnswerCard({
  answer: {
    id,
    text,
    createdDate,
    authorId,
    authorImagePath,
    authorName,
    repliesCount,
  },
}: Props) {
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();

  const editor = useEditor({
    extensions: handleTiptapExtensions(id),
    editorProps: handleTiptapEditorProps(id),
    editable: isEditMode,
    content: JSON.parse(text),
  });

  const handleUpdateBtnClick = () => {
    setIsEditMode(true);
    editor?.setOptions({ editable: true, autofocus: true });
    router.refresh();
  };

  const handleUpdate = () => {
    updateAnswer(id, JSON.stringify(editor?.getJSON())).then((res) => {
      if (res.code) {
        notifyToast(res.message, 'error');
        return;
      }
      notifyToast(res.message, 'success');
      setIsEditMode(false);
      editor?.setOptions({ editable: false });
      router.refresh();
    });
  };

  return (
    <article className="flex flex-col p-4 border-t-[0.5px] border-soma-grey-49 ">
      <AnswerCardHeader
        answerId={id}
        authorId={authorId}
        authorName={authorName}
        authorImagePath={authorImagePath}
        createdDate={createdDate}
        onUpdateBtnClick={handleUpdateBtnClick}
        onUpdate={handleUpdate}
        isEditMode={isEditMode}
      />
      <div className="my-2">
        <div className="break-all ">
          <EditorContent editor={editor} />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="text-sm">댓글 개수 {repliesCount}개</div>
      </div>
    </article>
  );
}
