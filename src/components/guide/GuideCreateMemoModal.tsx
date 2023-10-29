import CloseIcon from '@/components/search/CloseIcon';
import Tag from '@/components/shared/Tag';
import BlueBtn from '@/components/shared/btn/BlueBtn';
import { hasSpecialChar } from '@/service/validation';
import { useState } from 'react';

type Props = {
  onClose: () => void;
  onCreateBtnClick: () => void;
  description: string;
  tags: string;
};

export default function GuideCreateMemoModal({
  onClose,
  onCreateBtnClick,
  description,
  tags,
}: Props) {
  const [inputTag, setInputTag] = useState<string>('');
  const [currentTags, setCurrentTags] = useState<string[]>(
    JSON.parse(tags || '[]')
  );
  const [currentDescription, setCurrentDescription] =
    useState<string>(description);

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
        <div className="flex flex-col gap-4 sm:flex-row w-full">
          <div className="w-full sm:w-1/2">
            <p className="font-semibold text-xl my-2">Description</p>
            <textarea
              className="bg-soma-grey-20 p-3 resize-none break-all outline-none rounded-lg h-60 w-full text-sm"
              placeholder="메모를 소개해보세요..."
              onChange={(e) => setCurrentDescription(e.target.value)}
              value={currentDescription}
            ></textarea>
          </div>
          <div className=" flex flex-col w-full">
            <p className="font-semibold text-xl my-2">Series에 추가</p>
            <div className="flex justify-center items-center h-60">
              <p className="text-soma-grey-49 text-sm">series가 없습니다...</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="font-semibold text-xl my-2">Tags</p>
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
              placeholder="원하는 태그를 입력 후 엔터를 눌러주세요."
              name="tag"
              value={inputTag}
              onChange={(e) => setInputTag(e.target.value)}
              onKeyDown={handleKeyDown}
              className="grow outline-none p-1 text-sm sm:text-base bg-transparent"
            />
          </div>
        </div>
        <BlueBtn
          text="메모 작성하러 가기"
          onClick={() => onCreateBtnClick()}
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
function notifyToast(arg0: string, arg1: string) {
  throw new Error('Function not implemented.');
}
