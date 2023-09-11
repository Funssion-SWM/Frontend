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
import BlueBtn from './shared/btn/BlueBtn';
import WhiteBtn from './shared/btn/WhiteBtn';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { checkUser, registerUserInfo, updateUserInfo } from '@/service/auth';
import { UserInfo } from '@/types';
import Tag from './shared/Tag';

type Props = {
  userId: number;
  userInfo?: UserInfo;
  isSignup: boolean;
  defaultTags: string[];
};

export default function MyInfoForm({
  userId,
  userInfo,
  isSignup,
  defaultTags,
}: Props) {
  const router = useRouter();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(
    userInfo?.profileImageFilePath ?? ''
  );
  const [intro, setIntro] = useState<string>(userInfo?.introduce ?? '');
  const [selectedtdTags, setSelectedTags] = useState<string[]>(
    userInfo?.userTags ?? []
  );

  const fileInput = useRef() as MutableRefObject<HTMLInputElement>;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      const url = window.URL.createObjectURL(file);
      setImageFile(file);
      setImageUrl(url);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isSignup
      ? registerUserInfo(
          userId,
          imageFile,
          intro,
          selectedtdTags,
          imageUrl === '' && imageFile === null ? 'true' : 'false'
        ).then(() => {
          checkUser().then((data) => {
            router.push(data.isLogin ? '/memos' : '/login');
          });
        })
      : updateUserInfo(
          userId,
          imageFile,
          intro,
          selectedtdTags,
          imageUrl === '' && imageFile === null ? 'true' : 'false'
        ).then(() => {
          router.push(`/me/${userId}`);
        });
  };

  return (
    <form
      className="flex flex-col w-full"
      onSubmit={handleSubmit}
      onKeyDown={(e) => e.code === 'Enter' && e.preventDefault()}
    >
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
            src={imageUrl === '' ? profileImage : imageUrl}
            width={96}
            height={96}
            alt="profile"
            className="rounded-full w-24 h-24 object-cover"
          />
          <Image
            src={editIcon}
            alt="edit"
            className="absolute bottom-0 right-0"
          />
        </button>
      </div>
      <button
        type="button"
        className="w-fit text-xs bg-soma-grey-25 hover:bg-soma-grey-30 self-center p-2 rounded-2xl"
        onClick={() => {
          setImageFile(null);
          setImageUrl('');
        }}
      >
        기본 이미지 설정
      </button>

      <div className="flex flex-col my-3">
        <label htmlFor="intro" className="text-sm">
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
      <div className="flex flex-col my-3">
        <label className="text-sm">
          주요 분야 (최대 3가지의 keyword를 선택해주세요)
        </label>
        <div className="flex flex-wrap gap-1 my-2 justify-center">
          {defaultTags.map((tag, idx) => (
            <Tag
              key={idx}
              tagText={tag}
              onClick={(selected) => {
                if (selected)
                  setSelectedTags((preTags) =>
                    preTags.filter((item) => item !== tag)
                  );
                else {
                  if (selectedtdTags.length === 3) return false;
                  setSelectedTags((preTags) => [...preTags, tag]);
                }
                return true;
              }}
              isSelected={selectedtdTags.includes(tag)}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 my-3">
        <BlueBtn text={isSignup ? '등록' : '수정'} onClick={() => {}} />
        {isSignup && (
          <Link href="/login">
            <WhiteBtn text="나중에" onClick={() => {}} extraStyle="w-full" />
          </Link>
        )}
      </div>
    </form>
  );
}
