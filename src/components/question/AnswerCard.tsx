import { EditorContent, useEditor } from '@tiptap/react';
import { handleTiptapExtensions } from '../editor/extensions';
import { handleTiptapEditorProps } from '../editor/props';
import { Answer } from '@/types/answer';
import AnswerCardHeader from './AnswerCardHeader';

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
  return (
    <article className="flex flex-col p-4 border-t-[0.5px] border-soma-grey-49 ">
      <AnswerCardHeader
        answerId={id}
        authorId={authorId}
        authorName={authorName}
        authorImagePath={authorImagePath}
        createdDate={createdDate}
      />
      <div className="my-2">
        <div className="break-all ">
          <EditorContent
            editor={useEditor({
              extensions: handleTiptapExtensions(id),
              editorProps: handleTiptapEditorProps(id),
              editable: false,
              content: JSON.parse(text),
            })}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="text-sm">댓글 개수 {repliesCount}개</div>
      </div>
    </article>
  );
}
