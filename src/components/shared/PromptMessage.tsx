import Image from 'next/image';
import errorIcon from '@/assets/icons/icon_error.svg';
import { MessageProperty } from '@/types';

type Props = {
  property: MessageProperty;
};

export default function PromptgMessage({ property }: Props) {
  const { text, type, isVisible } = property;
  return (
    <div
      className={`flex ${
        type === 'success' ? 'bg-soma-blue-20' : 'bg-soma-red-20'
      } rounded-3xl p-4 w-fit m-auto ${!isVisible && 'invisible'}`}
    >
      {type !== 'success' && <Image src={errorIcon} alt="errorIcon" />}
      <p className="ml-1 text-sm">{text}</p>
    </div>
  );
}
