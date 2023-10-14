'use client';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BlueBtn from '../../shared/btn/BlueBtn';
import { ChangeEvent, MutableRefObject, useRef, useState } from 'react';
import AddMemoContainer from './AddMemoContainer';
import MemoOrderContainer from './MemoOrderContainer';
import { MAX_PROFILE_IMAGE_BYTE } from '@/utils/const';
import { notifyToast } from '@/service/notification';
import Image from 'next/image';
import { AiOutlinePicture } from 'react-icons/ai';
import { Memo } from '@/types/memo';

export default function SeriesForm() {
  const [imageFile, setImageFile] = useState<File>();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [memos, setMemos] = useState<Memo[]>([]);
  const [imageUrl, setImageUrl] = useState<string>();

  const fileInput = useRef() as MutableRefObject<HTMLInputElement>;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      if (file.size > MAX_PROFILE_IMAGE_BYTE) {
        notifyToast('최대 프로필 이미지 사이즈 2MB를 초과하였습니다.', 'error');
        return;
      }
      const url = window.URL.createObjectURL(file);
      setImageFile(file);
      setImageUrl(url);
    }
  };

  const handleAdd = (memos: Memo[]) => {
    setMemos((preMemos) => [...preMemos, ...memos]);
  };

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    setMemos((prevMemo) => {
      const arr = [...prevMemo];
      const elementToMove = arr[dragIndex];
      arr.splice(dragIndex, 1);
      arr.splice(hoverIndex, 0, elementToMove);
      return arr;
    });
  };

  const handleDeleteBtnClick = (memoId: number) => {
    setMemos((preMemos) => preMemos.filter((memo) => memo.memoId !== memoId));
  };

  return (
    <div className="flex flex-col w-full min-h-for-fit-screen">
      <div className="flex justify-between items-center mb-2">
        <div className="text-2xl font-semibold">Series</div>
        <BlueBtn text="만들기" onClick={() => {}} />
      </div>
      <div className="flex flex-col sm:flex-row  w-full gap-4 ">
        <div className="sm:min-w-[300px] flex flex-col rounded-lg">
          <div className="flex flex-col h-48">
            <input
              type="file"
              id="imageFile"
              name="imageFile"
              className="hidden"
              accept="image/*"
              ref={fileInput}
              onChange={handleFileChange}
            />
            <button
              className="flex justify-center items-center h-full bg-soma-grey-25 "
              onClick={() => fileInput.current.click()}
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  width={96}
                  height={96}
                  alt="profile"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div>
                  <AiOutlinePicture className="w-24 h-24" />
                  <p className="text-soma-grey-60 font-semibold">
                    썸네일 업로드
                  </p>
                </div>
              )}
            </button>
          </div>
          <input
            type="text"
            className="bg-soma-grey-25 p-3 my-3 outline-none rounded-lg"
            placeholder="시리즈 제목"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          ></input>
          <textarea
            className="bg-soma-grey-25 p-3 resize-none outline-none rounded-lg h-72"
            placeholder="시리즈를 짧게 소개해보세요..."
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </div>
        <div className="flex flex-col grow">
          <DndProvider backend={HTML5Backend}>
            <MemoOrderContainer
              memos={memos}
              moveCard={moveCard}
              onDeleteBtnClick={handleDeleteBtnClick}
            />
          </DndProvider>
          <AddMemoContainer
            memoIdsInSeries={memos.map((memo) => memo.memoId)}
            onAdd={handleAdd}
          />
        </div>
      </div>
    </div>
  );
}
