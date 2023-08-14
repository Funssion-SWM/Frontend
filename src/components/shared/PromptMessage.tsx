import Image from 'next/image';
import errorIcon from '@/assets/icons/icon_error.svg';

type Props = {
  text: string;
  type: boolean;
  isVisible: boolean;
};

export default function PromptgMessage({ text, type, isVisible }: Props) {
  return (
    <div
      className={`flex ${
        type ? 'bg-soma-blue-20' : 'bg-soma-red-20'
      } rounded-3xl p-4 w-fit m-auto ${!isVisible && 'invisible'}`}
    >
      {!type && <Image src={errorIcon} alt="errorIcon" />}
      <p className="ml-1 text-sm">{text}</p>
    </div>
  );
}
