import CloseIcon from '@/components/search/CloseIcon';
import Tag from '@/components/shared/Tag';
import BlueBtn from '@/components/shared/btn/BlueBtn';
import { getSeriesByUserId } from '@/service/me';
import { getMemoById } from '@/service/memos';
import { notifyToast } from '@/utils/notify';
import { hasSpecialChar } from '@/utils/validation';
import { Series } from '@/types/series';
import { useEffect, useState } from 'react';

type Props = {
  onClose: () => void;
  onCreateBtnClick: (
    description: string,
    seriesId: number | null,
    seriesTitle: string | null,
    tags: string[]
  ) => void;
  userId: number;
  description: string;
  tags: string;
  memoId: number;
};

export default function CreateMemoModal({
  onClose,
  onCreateBtnClick,
  userId,
  description,
  tags,
  memoId,
}: Props) {
  const [inputTag, setInputTag] = useState<string>('');
  const [currentTags, setCurrentTags] = useState<string[]>(
    JSON.parse(tags || '[]')
  );
  const [currentDescription, setCurrentDescription] =
    useState<string>(description);
  const [seriesArr, setSeriesArr] = useState<Series[]>([]);
  const [selectedSeriesId, setSelectedSeriesId] = useState<number | null>(null);
  const [selectedSeriesTitle, setSelectedSeriesTitle] = useState<string | null>(
    null
  );

  useEffect(() => {
    getSeriesByUserId(userId, 0, 20).then((seriesArr) =>
      setSeriesArr(seriesArr)
    );
    getMemoById(memoId).then((memo) => {
      setSelectedSeriesId(memo.seriesId);
      setSelectedSeriesTitle(memo.seriesTitle);
    });
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (inputTag === '' && e.key === 'Backspace') {
      setCurrentTags((preTags) => preTags.slice(0, -1));
      return;
    }
    if ((inputTag !== '' && e.key === 'Enter') || e.key === ',') {
      if (hasSpecialChar(inputTag)) {
        notifyToast('특수문자는 사용할 수 없습니다.', 'warning');
        return;
      }
      if (currentTags.includes(inputTag)) {
        notifyToast('중복된 태그는 사용할 수 없습니다.', 'warning');
        return;
      }
      setCurrentTags([...currentTags, inputTag]);
      setInputTag('');
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-white">
      <div
        className="fixed flex flex-col sm:shadow-lg bg-white rounded-2xl p-4 sm:p-10 
sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 mt-10 sm:mt-0 sm:-translate-y-1/2 w-full sm:w-[750px] sm:min-h-[400px] h-full sm:h-auto overflow-y-auto"
      >
        <div className="flex flex-col w-full gap-4 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <p className="my-2 text-xl font-semibold">Description</p>
            <textarea
              className="w-full p-3 text-sm break-all rounded-lg outline-none resize-none bg-soma-grey-20 h-60"
              placeholder="메모를 소개해보세요..."
              onChange={(e) => setCurrentDescription(e.target.value)}
              value={currentDescription}
            ></textarea>
          </div>
          <div className="flex flex-col w-full ">
            <p className="my-2 text-xl font-semibold">Series에 추가</p>
            {seriesArr.length === 0 ? (
              <div className="flex items-center justify-center h-60">
                <p className="text-sm text-soma-grey-49">
                  series가 없습니다...
                </p>
              </div>
            ) : (
              <ul className="overflow-y-auto h-60">
                {seriesArr.map((item) => (
                  <li
                    key={item.id}
                    className={`py-1 px-2 cursor-pointer line-clamp-1 break-all my-2 rounded-lg hover:bg-soma-blue-40 hover:text-white transition-all ${
                      item.id === selectedSeriesId
                        ? 'bg-soma-blue-40 text-white'
                        : 'bg-soma-grey-20'
                    }`}
                    onClick={() => {
                      if (item.id === selectedSeriesId) {
                        setSelectedSeriesId(null);
                        setSelectedSeriesTitle(null);
                      } else {
                        setSelectedSeriesId(item.id);
                        setSelectedSeriesTitle(item.title);
                      }
                    }}
                  >
                    <p>{item.title}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <p className="my-2 text-xl font-semibold">Tags</p>
          <div className="flex flex-wrap gap-1 mx-3 mb-1">
            {currentTags.map((tag, idx) => (
              <Tag
                key={idx}
                tagText={tag}
                onClick={() =>
                  setCurrentTags((preTags) =>
                    preTags.filter((item) => item !== tag)
                  )
                }
              />
            ))}
            <input
              type="text"
              placeholder="태그를 입력 후 엔터를 눌러주세요."
              name="tag"
              value={inputTag}
              onChange={(e) => setInputTag(e.target.value)}
              onKeyDown={handleKeyDown}
              className="p-1 text-sm bg-transparent outline-none grow sm:text-base"
            />
          </div>
        </div>
        <BlueBtn
          text="등록"
          onClick={() => {
            onCreateBtnClick(
              description,
              selectedSeriesId,
              selectedSeriesTitle,
              currentTags
            );
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
