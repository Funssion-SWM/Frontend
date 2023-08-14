'use client';

import { checkUser } from '@/service/auth';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Props = {
  userId: number;
};

export default function SettingBtns({ userId }: Props) {
  const [uid, setUid] = useState<number | null>(null);

  async function first() {
    await checkUser().then((data) => setUid(data.id));
  }

  useEffect(() => {
    first();
  }, []);
  return (
    uid === Number(userId) && (
      <div className="flex flex-col">
        <Link href={`/me/setting/${userId}`} className="text-center">
          <button className="mt-8 text-soma-grey-50 text-sm">
            회원 정보 수정
          </button>
        </Link>
      </div>
    )
  );
}
