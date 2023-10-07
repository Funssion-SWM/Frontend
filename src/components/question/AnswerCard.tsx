import { EditorContent, useEditor } from '@tiptap/react';
import { handleTiptapExtensions } from '../editor/extensions';
import { handleTiptapEditorProps } from '../editor/props';
import { Answer } from '@/types/answer';
import AnswerCardHeader from './AnswerCardHeader';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateAnswer } from '@/service/answers';
import { notifyToast } from '@/service/notification';
import { EditorBubbleMenu } from '../editor/components';
import AnswerCardFooter from './AnswerCardFooter';

type Props = {
  answer: Answer;
  userId: number;
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
  },
  userId,
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
    <article className="flex flex-col p-4 border-t-[1px] border-soma-grey-49 ">
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
      />
      <div className="break-all my-2">
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
    </article>
  );
}
