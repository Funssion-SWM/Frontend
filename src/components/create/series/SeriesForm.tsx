'use client';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BlueBtn from '../../shared/btn/BlueBtn';
import {
  ChangeEvent,
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import AddMemoContainer from './AddMemoContainer';
import MemoOrderContainer from './MemoOrderContainer';
import { MAX_IMAGE_BYTE } from '@/utils/const';
import { notifyToast } from '@/service/notify';
import Image from 'next/image';
import { createSeries, getSeriesById, updateSeries } from '@/service/series';
import { useRouter, useSearchParams } from 'next/navigation';
import { MemoInfo } from '@/types/series';
import { Memo } from '@/types/memo';
import defaultImage from '@/assets/inforumlogo1.jpeg';
import { ModalContext } from '@/context/ModalProvider';

type Props = {
  userId: number;
};

export default function SeriesForm({ userId }: Props) {
  const seriesId = Number(useSearchParams()?.get('id'));

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [memos, setMemos] = useState<MemoInfo[]>([]);
  const [imageUrl, setImageUrl] = useState<string>();
  const [isEmptyImage, setIsEmptyImage] = useState<'true' | 'false'>('true');
  const router = useRouter();
  const { open } = useContext(ModalContext);

  const fileInput = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (seriesId) {
      getSeriesById(seriesId).then((res) => {
        const { title, description, memoInfoList, thumbnailImagePath } = res;
        setTitle(title);
        setDescription(description);
        setMemos(memoInfoList);
        setImageUrl(thumbnailImagePath);
        thumbnailImagePath && setIsEmptyImage('false');
      });
    }
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      if (file.size > MAX_IMAGE_BYTE) {
        notifyToast(
          '최대 썸네일 이미지 사이즈 10MB를 초과하였습니다.',
          'error'
        );
        return;
      }
      const url = window.URL.createObjectURL(file);
      setImageFile(file);
      setImageUrl(url);
      setIsEmptyImage('false');
    }
  };

  const handleAdd = (memos: Memo[]) => {
    const memoInfos: MemoInfo[] = memos.map((memo) => {
      return {
        id: memo.memoId,
        title: memo.memoTitle,
        color: memo.memoColor,
      };
    });
    setMemos((preMemos) => [...preMemos, ...memoInfos]);
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
    setMemos((preMemos) => preMemos.filter((memo) => memo.id !== memoId));
  };

  const handleCreateBtnClick = () => {
    if (title.length === 0) {
      notifyToast('제목을 입력해주세요.', 'warning');
      return;
    }

    if (title.length > 120) {
      notifyToast('제목 수 제한 120자를 초과하였습니다.', 'warning');
      return;
    }

    if (description.length === 0) {
      notifyToast('description을 입력해주세요.', 'warning');
      return;
    }

    if (description.length > 255) {
      notifyToast('description 수 제한 255자를 초과하였습니다.', 'warning');
      return;
    }

    if (memos.length < 2) {
      notifyToast(
        '시리즈에 필요한 최소 메모 개수 2개를 추가해주세요.',
        'warning'
      );
      return;
    }

    seriesId
      ? updateSeries(
          seriesId,
          title,
          description,
          memos.map((memo) => memo.id),
          imageFile,
          isEmptyImage
        ).then((res) => {
          if ('code' in res) {
            notifyToast(res.message, 'error');
            return;
          }
          notifyToast('성공적으로 시리즈가 수정되었습니다.', 'success');
          router.push(`/series/${seriesId}`);
        })
      : createSeries(
          title,
          description,
          memos.map((memo) => memo.id),
          imageFile
        ).then((res) => {
          if ('code' in res) {
            notifyToast(res.message, 'error');
            return;
          }
          notifyToast('성공적으로 시리즈가  등록되었습니다.', 'success');
          router.push(`/series/${res.seriesId}`);
        });
  };

  const handleCancelImage = () => {
    setImageUrl('');
    setImageFile(null);
    setIsEmptyImage('true');
  };

  return (
    <div className="flex flex-col w-full min-h-for-fit-screen">
      <div className="flex justify-between items-center mb-2 mx-2 sm:mx-0">
        <div className="text-3xl font-semibold">Series</div>
        <BlueBtn text="등록" onClick={handleCreateBtnClick} />
      </div>
      <div className="flex flex-col sm:flex-row  w-full gap-4 ">
        <div className="sm:min-w-[300px] flex flex-col rounded-lg">
          {isEmptyImage === 'false' ? (
            <button
              className="self-end text-xs my-1 text-soma-grey-49"
              onClick={handleCancelImage}
            >
              기본 이미지로
            </button>
          ) : (
            <div className="h-4 my-1"></div>
          )}
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
              className="flex relative justify-center items-center h-full"
              onClick={() => fileInput.current.click()}
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  width={300}
                  height={192}
                  alt="profile"
                  className="w-ful h-full object-cover rounded-lg"
                />
              ) : (
                <Image
                  src={defaultImage}
                  width={300}
                  height={192}
                  alt="profile"
                  className="w-ful h-full object-cover rounded-lg"
                />
              )}
              {!imageUrl && (
                <div className="absolute bottom-2 text-soma-blue-40 font-semibold bg-white px-2 py-1 rounded-3xl text-sm">
                  썸네일 업로드
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
            className="bg-soma-grey-25 p-3 resize-none outline-none rounded-lg h-72 break-all"
            placeholder="시리즈를 짧게 소개해보세요..."
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
          <button
            className="text-soma-grey-50 mt-5 text-sm"
            onClick={() =>
              open('나가시겠습니까?', () => {
                router.push(`/series`);
              })
            }
          >
            나가기
          </button>
        </div>
        <div className="flex flex-col grow mt-6">
          <DndProvider backend={HTML5Backend}>
            <MemoOrderContainer
              memos={memos}
              moveCard={moveCard}
              onDeleteBtnClick={handleDeleteBtnClick}
            />
          </DndProvider>
          <AddMemoContainer
            memoIdsInSeries={memos.map((memo) => memo.id)}
            onAdd={handleAdd}
            userId={userId}
            seriesId={seriesId}
          />
        </div>
      </div>
    </div>
  );
}
