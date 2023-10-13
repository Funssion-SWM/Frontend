'use client';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BlueBtn from '../../shared/btn/BlueBtn';
import { Memo } from '@/types/memo';
import { useState } from 'react';
import AddMemoContainer from './AddMemoContainer';
import MemoOrderContainer from './MemoOrderContainer';

export default function SeriesForm() {
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [memoIds, setMemoIds] = useState<number[]>([]);

  return (
    <div className="flex flex-col w-full min-h-for-fit-screen">
      <div className="flex justify-between">
        <div className="text-3xl font-semibold">Series</div>
        <BlueBtn text="만들기" onClick={() => {}} />
      </div>
      <div className="flex w-full gap-4">
        <div className="w-1/3 flex flex-col">
          <div className="flex flex-col h-60">
            <button className="flex justify-center items-center h-full my-3 bg-soma-grey-25">
              썸네일 업로드
            </button>
          </div>
          <input
            type="text"
            className="bg-soma-grey-25 p-3  my-3"
            placeholder="시리즈 제목"
          ></input>
          <textarea
            className="bg-soma-grey-25 p-3 grow my-3 align-top max-h-[200px] resize-none"
            placeholder="시리즈를 짧게 소개해보세요..."
          ></textarea>
        </div>
        <div className="w-2/3 my-3">
          <DndProvider backend={HTML5Backend}>
            <MemoOrderContainer />
          </DndProvider>
          <AddMemoContainer />
        </div>
      </div>
    </div>
  );
}
