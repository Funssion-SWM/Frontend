import Image from 'next/image';
import example from '@/assets/profile.svg';

type Props = {
  commentProperty: {
    text: string;
  };
};

export default function Comment({ commentProperty }: Props) {
  const { text } = commentProperty;
  return (
    <div className="w-full border-b-2 border-soma-grey-30 p-3">
      <div className="flex items-center">
        {/* <Link href={`/me/${authorId}`}> */}
        <Image
          src={example}
          alt="profileImg"
          width={28}
          height={28}
          className="rounded-full w-7 h-7 object-cover "
        />
        {/* </Link> */}
        <div className="ml-2 text-xs">
          <div className="text-soma-grey-60">nickname</div>
          <p className="text-xs text-soma-grey-49">23.08.30</p>
        </div>
      </div>
      <div className="text-sm my-2 text-soma-grey-60">{text}</div>
    </div>
  );
}
