import Image from 'next/image';
import basicProfileImg from '@/assets/profile.svg';
import { Comment } from '@/types/comment';
import Link from 'next/link';
import { deleteComeent } from '@/service/comments';
import { useRouter } from 'next/navigation';

type Props = {
  commentProperty: Comment;
  isMyComment: boolean;
};

export default function CommentItem({ commentProperty, isMyComment }: Props) {
  const {
    id,
    commentText,
    authorId,
    authorImagePath,
    authorName,
    createdDate,
  } = commentProperty;

  const router = useRouter();

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
      <p className="text-sm my-2 text-soma-grey-60">{commentText}</p>
      <div className="flex justify-between items-center text-[10px]">
        <p>답글 보기</p>
        {isMyComment && (
          <div className="flex gap-2 ">
            <button>수정</button>
            <button
              onClick={() => {
                deleteComeent(id);
                router.refresh();
              }}
            >
              삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
