import { useEditor } from '@tiptap/react';
import { handleTiptapExtensions } from '../editor/extensions';
import { handleTiptapEditorProps } from '../editor/props';
import { Answer } from '@/types/answer';
import AnswerCardHeader from './AnswerCardHeader';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateAnswer } from '@/service/answers';
import { notifyToast } from '@/service/notify';
import AnswerCardFooter from './AnswerCardFooter';
import { generateHTML } from '@tiptap/html';

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
    rank,
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

  const output = useMemo(() => {
    return generateHTML(JSON.parse(text), handleTiptapExtensions('answer', 0));
  }, [text]);

  const handleUpdateBtnClick = () => {
    setIsEditMode(true);
    editor?.setOptions({ editable: true, autofocus: true });
    router.refresh();
  };

  const handleUpdate = () => {
    updateAnswer(id, JSON.stringify(editor?.getJSON())).then((res) => {
      if ('code' in res) {
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
        isSelected={selected}
        questionId={questionId}
        authorRank={rank}
      />
      <div
        className="max-w-full my-3 prose-sm break-all sm:prose-lg prose-headings:my-2 prose-p:my-0 prose-stone dark:prose-invert prose-headings:font-display font-default focus:outline-none"
        dangerouslySetInnerHTML={{
          __html: output,
        }}
      ></div>
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
        <div className="absolute top-0 right-0 px-4 py-2 text-xs font-medium rounded-t-none bg-soma-blue-40 text-soma-white rounded-xl rounded-e-none sm:text-base">
          selected
        </div>
      )}
    </article>
  );
}
