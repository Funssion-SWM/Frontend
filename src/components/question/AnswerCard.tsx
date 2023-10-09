import { EditorContent, useEditor } from '@tiptap/react';
import { handleTiptapExtensions } from '../editor/extensions';
import { handleTiptapEditorProps } from '../editor/props';
import { Answer } from '@/types/answer';
import AnswerCardHeader from './AnswerCardHeader';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateAnswer } from '@/service/answers';
import { notifyToast } from '@/service/notification';
import AnswerCardFooter from './AnswerCardFooter';

type Props = {
  answer: Answer;
  userId: number;
  isMyQuestion: boolean;
  isSolved: boolean;
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
    mine,
    likes,
    dislikes,
    like,
    disLike,
    questionId,
    selected,
  },
  userId,
  isMyQuestion,
  isSolved,
}: Props) {
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();

  const editor = useEditor({
    extensions: handleTiptapExtensions('answer', 0),
    editorProps: handleTiptapEditorProps('answer', 0),
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
    <article
      className={`flex flex-col relative p-4 border-b-[1px] border-soma-grey-49 ${
        selected && 'bg-soma-blue-10'
      }`}
    >
      <AnswerCardHeader
        answerId={id}
        authorId={authorId}
        authorName={authorName}
        authorImagePath={authorImagePath}
        createdDate={createdDate}
        onUpdateBtnClick={handleUpdateBtnClick}
        onUpdate={handleUpdate}
        isEditMode={isEditMode}
        isMyAnswer={mine}
        isMyQuestion={isMyQuestion}
        isSolved={isSolved}
        questionId={questionId}
      />
      <div className="break-all my-3">
        <EditorContent editor={editor} />
      </div>
      <AnswerCardFooter
        repliesCount={repliesCount}
        answerId={id}
        authorId={authorId}
        userId={userId}
        likeNum={likes}
        dislikeNum={dislikes}
        isLike={like}
        isDislike={disLike}
      />
      {selected && (
        <div className="absolute top-0 right-0 font-medium bg-soma-blue-40 text-soma-white py-2 px-4 rounded-xl rounded-e-none rounded-t-none text-xs sm:text-base">
          selected
        </div>
      )}
    </article>
  );
}
