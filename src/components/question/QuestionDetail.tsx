'use client';

import { Question } from '@/types/question';
import { generateHTML } from '@tiptap/html';
import { handleTiptapExtensions } from '../editor/extensions';
import QuestionHeader from './QuestionHeader';
import QuestionFooter from './QuestionFooter';
import AnswersList from './AnswersList';
import { Answer } from '@/types/answer';
import AnswerForm from './AnswerForm';
import { useEffect, useMemo, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import { handleTiptapEditorProps } from '../editor/props';

type Props = {
  questionData: Question;
  answers: Answer[];
  isLike: boolean;
  userId: number;
  memoTitle: string;
  isLogin: boolean;
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
  isLogin,
}: Props) {
  const [hydrated, setHydrated] = useState(false);

  const editor = useEditor({
    extensions: handleTiptapExtensions('question', id),
    editorProps: handleTiptapEditorProps('question', id),
    editable: false,
    content: JSON.parse(text),
  });

  const output = useMemo(() => {
    return generateHTML(
      JSON.parse(text),
      handleTiptapExtensions('question', id)
    );
  }, [text]);

  useEffect(() => {
    editor?.commands.setContent(JSON.parse(text));
    setHydrated(true);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="p-5 bg-soma-grey-25 rounded-2xl">
        <QuestionHeader
          questionId={id}
          likeNum={likes}
          createdDate={createdDate}
          memoId={memoId}
          isMyQuestion={mine}
          isLike={isLike}
        />
        <div className="my-5">
          <h1 className="text-2xl font-bold break-all sm:text-4xl text-soma-grey-70">
            {title}
          </h1>
          <div className="h-[0.5px] mx-1 my-4 bg-soma-grey-49"></div>

          {hydrated ? (
            <div className="break-all">
              <EditorContent editor={editor} />
            </div>
          ) : (
            <div
              className="hidden"
              dangerouslySetInnerHTML={{
                __html: output,
              }}
            ></div>
          )}
        </div>
        <QuestionFooter
          tags={tags}
          memoId={memoId}
          memoTitle={memoTitle}
          isLogin={isLogin}
        />
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
