import Image from 'next/image';
import more from '@/assets/icons/more.svg';

type Props = {
  isActive: boolean;
  onClick: () => void;
  onUpdateBtnClick: () => void;
  onDeleteBtnClick: () => void;
};

export default function MoreOptions({
  isActive,
  onClick,
  onDeleteBtnClick,
  onUpdateBtnClick,
}: Props) {
  return (
    <div className="flex ml-2">
      <button onClick={onClick}>
        <Image src={more} alt="more" />
      </button>
      <nav
        className={`absolute top-6 right-0 bg-white flex flex-col z-10 gap-1 rounded-lg shadow-inner ${
          isActive ? 'visible' : 'invisible'
        }`}
      >
        <button
          className="p-2 rounded-t-lg hover:bg-gray-200"
          onClick={onUpdateBtnClick}
        >
          수정하기
        </button>
        <button
          className="p-2 rounded-b-lg hover:bg-gray-200"
          onClick={onDeleteBtnClick}
        >
          삭제하기
        </button>
      </nav>
    </div>
  );
}
