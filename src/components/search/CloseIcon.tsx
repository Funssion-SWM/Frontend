"use client"

import closeIcon from '@/assets/icons/icon_close.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Props = {
  extraClass?:string,
  onClick?: () => void;
  size:number;
}

export default function CloseIcon( { extraClass, onClick, size }:Props) {
  const router = useRouter();

  return (
    <div className={extraClass}>
      <Image 
      className='cursor-pointer' 
      width={size} 
      height={size} 
      src={closeIcon} 
      alt="close_icon" onClick={onClick ? onClick : () => router.back()}/>
    </div>
  )

}