'use client';

import { Question } from '@/types/question';
import { EditorContent, useEditor } from '@tiptap/react';
import { handleTiptapExtensions } from '../editor/extensions';
import { handleTiptapEditorProps } from '../editor/props';
import QuestionHeader from './QuestionHeader';
import QuestionFooter from './QuestionFooter';
import CategoryBtn from '../shared/btn/CategoryBtn';
import AnswersList from './AnswersList';

type Props = {
  questionData: Question;
};

export default function QuestionDetail({
  questionData: {
    questionTitle,
    questionText,
    questionId,
    questionTags,
    createdDate,
  },
}: Props) {
  return (
    <div className="flex flex-col">
      <div className="bg-sky-50">
        <QuestionHeader />
        <div className="my-5">
          <h2 className="text-2xl xm:text-4xl text-soma-grey-70 font-bold break-all">
            {questionTitle}
          </h2>
          <div className="break-all ">
            <EditorContent
              editor={useEditor({
                extensions: handleTiptapExtensions(questionId),
                editorProps: handleTiptapEditorProps(questionId),
                editable: false,
                content: JSON.parse(questionText),
              })}
            />
          </div>
        </div>
        <QuestionFooter questionTags={questionTags} createdDate={createdDate} />
      </div>
      <div>
        <p>답변을 작성해보세요</p>
        <div className="h-40 overflow-y-scroll border-2 rounded-md">
          <EditorContent
            editor={useEditor({
              extensions: handleTiptapExtensions(questionId),
              editorProps: handleTiptapEditorProps(questionId),
            })}
          />
        </div>
      </div>
      <div>
        <div className="flex gap-2 my-2 ml-1 sm:mb-5">
          <CategoryBtn text="답변" onClick={() => {}} isSelected={true} />
          <CategoryBtn text="추천" onClick={() => {}} isSelected={false} />
        </div>
        <AnswersList />
      </div>
    </div>
  );
}
