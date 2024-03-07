import { DefaultProfile } from '@/assets/svg';
import { MAIN_PATH } from '@/constants/general';
import { ModalContext } from '@/context/ModalProvider';
import { useDetectOutsideClick } from '@/hooks/useDeleteOutsideClick';
import { checkUser, logout } from '@/service/auth';
import { Authority } from '@/types/auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext, useRef } from 'react';

type Props = {
  profileImageFilePath: string | undefined;
  authority: Authority;
};

export default function MoreBox({ profileImageFilePath, authority }: Props) {
  const dropdownRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const { open } = useContext(ModalContext);
  const router = useRouter();

  return (
    <nav className="flex items-center" ref={dropdownRef}>
      <button onClick={() => setIsActive((pre) => !pre)}>
        <Image
          src={profileImageFilePath ?? DefaultProfile}
          alt="profileImg"
          width={32}
          height={32}
          className="object-cover w-8 h-8 rounded-full"
        />
      </button>

      <div
        className={`absolute top-9 right-[36px] sm:top-10 sm:right-[44px] bg-white flex flex-col gap-1 rounded-lg shadow-inner z-10 ${
          isActive ? 'visible' : 'invisible'
        }`}
      >
        {authority === 'ROLE_EMPLOYER' && (
          <button
            className="p-2 px-3 tracking-wider rounded-t-lg hover:bg-gray-200"
            onClick={() => {
              checkUser().then((data) => {
                router.push(`/me/employer/${data.id}`);
                router.refresh();
              });
              setIsActive(false);
            }}
          >
            채용자 페이지
          </button>
        )}
        <button
          className="p-2 px-3 tracking-wider rounded-t-lg hover:bg-gray-200"
          onClick={() => {
            checkUser().then((data) => {
              router.push(`/me/${data.id}`);
              router.refresh();
            });
            setIsActive(false);
          }}
        >
          마이페이지
        </button>
        <button
          className="p-2 px-3 tracking-wider hover:bg-gray-200"
          onClick={() => {
            checkUser().then((data) => router.push(`/drafts/${data.id}`));
            setIsActive(false);
          }}
        >
          임시글
        </button>
        <button
          className="p-2 px-3 tracking-wider rounded-b-lg hover:bg-gray-200"
          onClick={() => {
            setIsActive(false);
            open('로그아웃 하시겠습니까?', () => {
              logout().then(() => {
                router.push(MAIN_PATH);
                router.refresh();
              });
            });
          }}
        >
          로그아웃
        </button>
      </div>
    </nav>
  );
}
