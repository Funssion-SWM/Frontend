import basicProfileImg from '@/assets/profile.svg';
import Image from 'next/image';
import Link from 'next/link';
import fillHeart from '@/assets/icons/heart_fill.svg';
import { EditorContent, useEditor } from '@tiptap/react';
import { handleTiptapExtensions } from '../editor/extensions';
import { handleTiptapEditorProps } from '../editor/props';

type Props = {
  answer: {
    answerId: number;
    answerTitle: string;
    answerText: string;
    createdDate: string;
  };
};

export default function AnswerCard({
  answer: { answerId, answerTitle, answerText, createdDate },
}: Props) {
  return (
    <article className="flex flex-col p-4 border-t-[0.5px] border-soma-grey-49 ">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Link href={`/me/1`}>
            <Image
              src={basicProfileImg}
              alt="profileImg"
              width={36}
              height={36}
              className="rounded-full w-9 h-9 object-cover"
            />
          </Link>
          <div className="ml-2">
            <h4 className="text-soma-grey-60 font-medium">dongree</h4>
            <p className="text-xs text-soma-grey-49">{createdDate}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Image src={fillHeart} alt="fill_heart" width={16} height={16} />
          <p className="text-soma-grey-49 text-xs w-5 text-center ml-0.5">12</p>
        </div>
      </div>
      <div className="my-2">
        <h2 className="text-2xl text-soma-grey-70 font-extrabold line-clamp-1">
          {answerTitle}
        </h2>
        <div className="break-all ">
          <EditorContent
            editor={useEditor({
              extensions: handleTiptapExtensions(answerId),
              editorProps: handleTiptapEditorProps(answerId),
              editable: false,
              content: JSON.parse(answerText),
            })}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="text-sm">댓글 개수 7개</div>
      </div>
    </article>
  );
}
