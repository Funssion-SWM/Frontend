import Image from 'next/image';
import basicProfileImg from '@/assets/profile.svg';
import { Comment } from '@/types/comment';
import Link from 'next/link';

type Props = {
  commentProperty: Comment;
};

export default function CommentItem({ commentProperty }: Props) {
  const { commentText, authorId, authorImagePath, authorName, createdDate } =
    commentProperty;
  return (
    <div className="w-full border-b-2 border-soma-grey-30 p-3">
      <div className="flex items-center">
        <Link href={`/me/${authorId}`}>
          <Image
            src={authorImagePath ?? basicProfileImg}
            alt="profileImg"
            width={28}
            height={28}
            className="rounded-full w-7 h-7 object-cover "
          />
        </Link>
        <div className="ml-2 text-xs">
          <div className="text-soma-grey-60">{authorName}</div>
          <p className="text-xs text-soma-grey-49">
            {createdDate.substring(0, 10)}
          </p>
        </div>
      </div>
      <div className="text-sm my-2 text-soma-grey-60">{commentText}</div>
    </div>
  );
}
