'use client';

import { Question } from '@/types/question';
import { EditorContent, useEditor } from '@tiptap/react';
import { handleTiptapExtensions } from '../editor/extensions';
import { handleTiptapEditorProps } from '../editor/props';
import QuestionHeader from './QuestionHeader';
import QuestionFooter from './QuestionFooter';
import AnswersList from './AnswersList';
import { Answer } from '@/types/answer';
import AnswerForm from './AnswerForm';

type Props = {
  questionData: Question;
  answers: Answer[];
  isLike: boolean;
  userId: number;
  memoTitle: string;
};

export default function QuestionDetail({
  questionData: {
    title,
    text,
    id,
    tags,
    createdDate,
    likes,
    memoId,
    mine,
    answersCount,
    solved,
  },
  answers,
  isLike,
  userId,
  memoTitle,
}: Props) {
  return (
    <div className="flex flex-col">
      <div className="bg-soma-grey-20 rounded-2xl p-5">
        <QuestionHeader
          questionId={id}
          likeNum={likes}
          createdDate={createdDate}
          memoId={memoId}
          isMyQuestion={mine}
          isLike={isLike}
        />
        <div className="my-5">
          <h2 className="text-2xl sm:text-4xl text-soma-grey-70 font-bold break-all">
            {title}
          </h2>
          <div className="h-[0.5px] mx-1 my-4 bg-soma-grey-49"></div>
          <div className="break-all ">
            <EditorContent
              editor={useEditor({
                extensions: handleTiptapExtensions('question', id),
                editorProps: handleTiptapEditorProps('question', id),
                editable: false,
                content: JSON.parse(text),
              })}
            />
          </div>
        </div>
        <QuestionFooter tags={tags} memoId={memoId} memoTitle={memoTitle} />
      </div>
      <p className="sm:text-xl p-2 mt-10 font-semibold border-b-[1px] border-soma-grey-49 ">
        <span className="text-soma-blue-40">{answersCount}개</span>의 답변
      </p>
      <AnswersList
        answers={answers}
        userId={userId}
        isMyQuestion={mine}
        isSolved={solved}
      />
      {!mine && <AnswerForm questionId={id} />}
    </div>
  );
}
