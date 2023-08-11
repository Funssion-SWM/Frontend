import { useDetectOutsideClick } from '@/hooks/useDeleteOutsideClick';
import { checkUser } from '@/service/auth';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineEllipsis } from 'react-icons/ai';
import WriterBtns from '../shared/WriterBtns';
import Like from '../shared/Like';


type Props = {
  memoId: number;
  authorId: number;
  likes: number;
}

export default function MemoViewerHeader({ memoId, authorId, likes }:Props) {
  const dropdownRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [uid, setUid] = useState<number | null>(null);

  async function first() {
    await checkUser().then((data) => setUid(data.id));
  }

  useEffect(() => {
    first();
  }, []);


  return (
    <section className='pt-4 border-b border-gray-300'>
      <div className='text-right relative'>

        <Like likes={likes} memoId={memoId} uid={uid} />
        
        <AiOutlineEllipsis className='inline-block cursor-pointer w-5 h-5 mr-2 mb-1' onClick={() => setIsActive((pre) => !pre)} />
      </div>

      <div className='text-right py-2'>
        <nav
          className={`  ${isActive ? 'block' : 'hidden'}`}
        >
          <div className='relative right-0' onClick={() => setIsActive(false)}>
            {authorId === uid ? (
              <WriterBtns memoId={memoId} />
            ) : <></>}
          </div>
        </nav>
      </div>
    </section>
  )
}