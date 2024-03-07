import { checkUser, getUserInfo } from '@/service/auth';
import LogoButton from './LogoButton';
import Navigater from './Navigater';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/general';
import { getNotificationsTop30 } from '@/service/notification';
import Submenu1 from './SubMenu1';
import Submenu2 from './SubMenu2';
import ScrollAnimationCover from './ScrollAnimationCover';
import NavigatorInMobile from './NavigatorInMobile';

type Props = {
  currentPage?: 'memos' | 'questions' | 'series';
};

export default async function Header({ currentPage }: Props) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;
  const refreshToken = cookies().get(REFRESH_TOKEN)?.value;
  const cookie = `${ACCESS_TOKEN}=${accessToken}; ${REFRESH_TOKEN}=${refreshToken}`;

  const { id, isLogin, authority } = await checkUser(cookie);

  const { profileImageFilePath } = isLogin
    ? await getUserInfo(id)
    : { profileImageFilePath: undefined };

  const notifications = isLogin ? await getNotificationsTop30(cookie) : [];

  return (
    <ScrollAnimationCover>
      <div className="flex justify-center relative items-center py-4 px-1 sm:px-5 max-w-screen-xl m-auto h-[70px]">
        <LogoButton />
        <Navigater currentPage={currentPage} />
        {isLogin ? (
          <Submenu1
            authority={authority}
            profileImageFilePath={profileImageFilePath}
            notifications={notifications}
          />
        ) : (
          <Submenu2 />
        )}
      </div>
      <NavigatorInMobile currentPage={currentPage} />
    </ScrollAnimationCover>
  );
}
