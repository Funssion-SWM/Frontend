'use client';

import { Question } from '@/types/question';
import { EditorContent, useEditor } from '@tiptap/react';
import { handleTiptapExtensions } from '../editor/extensions';
import { handleTiptapEditorProps } from '../editor/props';
import QuestionHeader from './QuestionHeader';
import QuestionFooter from './QuestionFooter';
import CategoryBtn from '../shared/btn/CategoryBtn';
import AnswersList from './AnswersList';
import { Answer } from '@/types/answer';
import AnswerForm from './AnswerForm';

type Props = {
  questionData: Question;
  answers: Answer[];
};

export default function QuestionDetail({
  questionData: { title, text, id, tags, createdDate, likes, memoId, mine },
  answers,
}: Props) {
  return (
    <div className="flex flex-col">
      <div className="bg-soma-grey-20 rounded-2xl p-3">
        <QuestionHeader
          questionId={id}
          likeNum={likes}
          createdDate={createdDate}
          memoId={memoId}
          isMyQuestion={mine}
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
        <QuestionFooter tags={tags} />
      </div>
      <AnswersList answers={answers} />
      <AnswerForm questionId={id} />
    </div>
  );
}
