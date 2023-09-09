"use client"

import closeIcon from '@/assets/icons/icon_close.svg';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type Props = {
  extraClass:string,
}

export default function CloseIcon( { extraClass }:Props) {

  const router = useRouter();

  return (
    <div className={extraClass}>
      <Image className='cursor-pointer' src={closeIcon} alt="close_icon" onClick={() => router.back()}/>
    </div>
  )

}