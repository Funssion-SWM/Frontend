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
  questionData: { title, text, id, tags, createdDate },
}: Props) {
  return (
    <div className="flex flex-col">
      <div className="bg-sky-50">
        <QuestionHeader />
        <div className="my-5">
          <h2 className="text-2xl xm:text-4xl text-soma-grey-70 font-bold break-all">
            {title}
          </h2>
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
        <QuestionFooter tags={tags} createdDate={createdDate} />
      </div>
      <div>
        <p>답변을 작성해보세요</p>
        <div className="h-40 overflow-y-scroll border-2 rounded-md">
          <EditorContent
            editor={useEditor({
              extensions: handleTiptapExtensions(id),
              editorProps: handleTiptapEditorProps(id),
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
