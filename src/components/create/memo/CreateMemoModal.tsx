import CloseIcon from '@/components/search/CloseIcon';
import BlueBtn from '@/components/shared/btn/BlueBtn';
import { getSeriesByUserId } from '@/service/me';
import { Series } from '@/types/series';
import { useEffect, useState } from 'react';

type Props = {
  onClose: () => void;
  onCreateBtnClick: (description: string, seriesId: number | null) => void;
  userId: number;
};

export default function CreateMemoModal({
  onClose,
  onCreateBtnClick,
  userId,
}: Props) {
  const [description, setDescription] = useState<string>('');
  const [seriesArr, setSeriesArr] = useState<Series[]>([]);
  const [selectedSeriesId, setSelectedSeriesId] = useState<number | null>(null);

  useEffect(() => {
    getSeriesByUserId(userId, 0, 20).then((seriesArr) =>
      setSeriesArr(seriesArr)
    );
  }, []);

  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-white ">
      <div
        className="fixed flex flex-col sm:flex-row gap-4 sm:shadow-lg items-center bg-white rounded-2xl p-4 sm:p-10 
sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 mt-10 sm:mt-0 sm:-translate-y-1/2 w-full sm:w-[750px] sm:h-[400px]"
      >
        <div className="w-full sm:w-1/2">
          <p className="font-semibold text-xl my-2">Description</p>
          <textarea
            className="bg-soma-grey-25 p-3 resize-none break-all outline-none rounded-lg h-60 w-full"
            placeholder="메모를 소개해보세요..."
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </div>
        <div className=" flex flex-col w-full">
          <p className="font-semibold text-xl my-2">Serise에 추가</p>
          <ul className="flex flex-col gap-1 h-60 overflow-y-auto ">
            {seriesArr.map((item) => (
              <li
                key={item.id}
                className={`p-1 cursor-pointer line-clamp-1 break-all ${
                  item.id === selectedSeriesId
                    ? 'bg-soma-blue-40 text-white'
                    : 'bg-soma-grey-20'
                }`}
                onClick={() => {
                  if (item.id === selectedSeriesId) {
                    setSelectedSeriesId(null);
                  } else {
                    setSelectedSeriesId(item.id);
                  }
                }}
              >
                <p>{item.title}</p>
              </li>
            ))}
          </ul>
        </div>
        <BlueBtn
          text="등록"
          onClick={() => {
            onCreateBtnClick(description, selectedSeriesId);
          }}
          extraStyle="absolute top-2 right-3"
        />
      </div>
      <CloseIcon
        size={24}
        onClick={() => onClose()}
        extraClass="absolute top-2 right-2 sm:top-10 sm:right-10"
      />
    </div>
  );
}
