import Image from 'next/image';
import example from '@/assets/profile.svg';

type Props = {
  commentProperty: {
    title: string;
    description: string;
  };
};

export default function Comment({ commentProperty }: Props) {
  const { title, description } = commentProperty;
  return (
    <div className="w-full border-b-2 border-soma-grey-30 p-3">
      <div className="flex items-center">
        {/* <Link href={`/me/${authorId}`}> */}
        <Image
          src={example}
          alt="profileImg"
          width={28}
          height={28}
          className="rounded-full w-10 h-10 object-cover"
        />
        {/* </Link> */}
        <div className="ml-2 text-xs">
          <div>nickname</div>
          <p className="text-xs text-gray-600">23.08.30</p>
        </div>
      </div>
      <div className="text-sm font-bold">{title}</div>
      <div className="text-[13px] text-soma-grey-49">{description}</div>
    </div>
  );
}
