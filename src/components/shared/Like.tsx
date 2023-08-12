'use-client'

import { useEffect, useState } from "react";
import FillHeart from "../ui/icons/fill-heart";
import OutlineHeart from "../ui/icons/outline-heart";
import { getIsLiked, like, unlike } from "@/service/like";
import { checkUser } from "@/service/auth";
import { useRouter } from "next/navigation";

type Props = {
  likes: number;
  memoId: number;
  uid: number | null;
};

export default function Like({ likes, memoId, uid }: Props) {

  const [fakeLikes, setFakeLikes] = useState<number>(likes);
  const [isLike, setIsLike] = useState<Boolean>(false);
  const router = useRouter();

  async function first() {
    await getIsLiked("memos", memoId).then(data => setIsLike(data.isLike));
  }

  useEffect(() => {
    first();
  }, []);

  async function onClickLike() {
    if (uid == null) {
      alert("로그인 후 이용할 수 있습니다.");
      router.push("/login");
    }
    // 이미 클릭됨
    if (fakeLikes == likes + 1 || isLike) return;
    
    setFakeLikes(fakeLikes + 1);
    setIsLike(true);

    like("memos", memoId).then(data => console.log(data));
  }

  function onClickUnlike() {
    if (uid == null) {
      alert("로그인 후 이용할 수 있습니다.");
      router.push("/login");
    }
    // 이미 클릭됨
    if (fakeLikes == likes - 1 || !isLike) return;

    setFakeLikes(fakeLikes - 1);
    setIsLike(false);

    unlike("memos", memoId);
  }

  return (
    <>
      <span className="cursor-pointer" onClick={() => isLike ? onClickUnlike() : onClickLike()}>
          {
            isLike ? 
            <FillHeart className="inline-block w-5 h-5 text-red-500 mr-2 mb-1" /> :
            <OutlineHeart className="inline-block w-5 h-5 text-red-500 mr-2 mb-1" />
          }
        </span>
      <span className='mr-3'>{fakeLikes}</span>
    </>
  );
}


