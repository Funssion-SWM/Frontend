'use client';

import Image from 'next/image';
import {
  ChangeEvent,
  FormEvent,
  MutableRefObject,
  useRef,
  useState,
} from 'react';

import profileImage from '../assets/profile.svg';
import editIcon from '../assets/icons/edit.svg';
import BlueBtn from './shared/BlueBtn';
import BlueBtn2 from './shared/BlueBtn2';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Props = {
  userId: number;
};

export default function MyInfoForm({ userId }: Props) {
  const router = useRouter();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [intro, setIntro] = useState('');

  const fileInput = useRef() as MutableRefObject<HTMLInputElement>;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) setImageFile(e.target.files[0]);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(imageFile);
    console.log(intro);
  };

  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit}>
      <div className="flex my-3">
        <input
          type="file"
          id="imageFile"
          name="imageFile"
          className="hidden"
          accept="image/*"
          ref={fileInput}
          onChange={handleFileChange}
        />
        <button
          type="button"
          className="relative w-fit m-auto"
          onClick={() => fileInput.current.click()}
        >
          <Image
            src={profileImage}
            width={96}
            height={96}
            alt="profile"
            className="rounded-full"
          />
          <Image
            src={editIcon}
            alt="edit"
            className="absolute bottom-0 right-0"
          />
        </button>
      </div>

      <div className="flex flex-col my-3">
        <label htmlFor="confirmPw" className="text-sm">
          자기 소개
        </label>
        <textarea
          className="border-2 my-2 py-2 px-4 rounded-lg bg-soma-grey-20 border-soma-grey-30 grow resize-none h-32"
          id="intro"
          name="intro"
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
          placeholder="자기 소개를 입력해주세요."
        />
      </div>
      <div className="flex flex-col gap-2 my-3">
        <BlueBtn text="등록" onClick={() => {}} />
        <Link href="/login">
          <BlueBtn2 text="나중에" onClick={() => {}} extraStyle="w-full" />
        </Link>
      </div>
    </form>
  );
}
