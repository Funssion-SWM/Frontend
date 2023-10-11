'use client';

import { ModalContext } from '@/context/ModalProvider';
import { withdraw } from '@/service/auth';
import { notifyToast } from '@/service/notification';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

type Props = {
  myId: number;
};

export default function Setting({ myId }: Props) {
  const router = useRouter();
  const { open } = useContext(ModalContext);

  return (
    <div className="flex flex-col gap-4 text-soma-grey-50 text-sm items-center mt-8">
      <Link href={`/me/setting/${myId}`} prefetch={false}>
        회원 정보 수정
      </Link>
      <button
        onClick={() => {
          open(
            '회원 탈퇴 시 이용 데이터는 복구할 수 없습니다. 정말 탈퇴하시겠습니까?',
            () => {
              withdraw().then((res) => {
                if (res?.code) {
                  notifyToast(res.message, 'error');
                  return;
                }
                notifyToast('성공적으로 탈퇴되었습니다.', 'success');
                router.push('/memos');
                router.refresh();
              });
            }
          );
        }}
      >
        회원 탈퇴
      </button>
    </div>
  );
}
