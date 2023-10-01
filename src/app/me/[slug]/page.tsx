import Header from '@/components/shared/Header';
import { getHistory, getMemosByUserId } from '@/service/me';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { checkUser, getUserInfo } from '@/service/auth';
import MeMainContainer from '@/components/me/MeMainContainer';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN, MY_TAG_MAX_COUNT, REFRESH_TOKEN } from '@/utils/const';
import MeSideBar from '@/components/me/MeSideBar';
import { getUserTags } from '@/service/tag';
import MeTagsContainer from '@/components/me/MeTagsContainer';

type Props = {
  params: {
    slug: string;
  };
};

export default async function MePage({ params: { slug } }: Props) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;
  const refreshToken = cookies().get(REFRESH_TOKEN)?.value;
  const cookie = `${ACCESS_TOKEN}=${accessToken}; ${REFRESH_TOKEN}=${refreshToken}`;
  const userId = Number(slug);

  const memosData = getMemosByUserId(userId);
  const userData = getUserInfo(userId, cookie);
  const historyData = getHistory(
    userId,
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    true
  );
  const myData = checkUser(cookie);
  const tagData = getUserTags(slug, MY_TAG_MAX_COUNT);
  

  const [memos, userInfo, history, { id, isLogin }, tags] = await Promise.all([
    memosData,
    userData,
    historyData,
    myData,
    tagData,
  ]);

  const { profileImageFilePath } = isLogin
    ? await getUserInfo(id)
    : { profileImageFilePath: undefined };

  return (
    <section>
      <Header isLogin={isLogin} profileImageFilePath={profileImageFilePath} />
      <LayoutWrapper>
        <div className="flex flex-col sm:flex-row">
          <MeSideBar
            userInfo={userInfo}
            history={history}
            userId={userId}
            myId={id}
          />
          <div className="flex flex-col w-full">
            {tags.length >= 2 && (
              <MeTagsContainer
                tags={tags}
                userInfo={userInfo}
                userId={userId}
                isLogin={isLogin}
              />
            )}
            <MeMainContainer memos={memos} userId={userId} />
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}

export async function generateMetadata({ params }: Props) {
  const userId = Number(params.slug);
  const { nickname } = await getUserInfo(userId);

  return {
    title: `${nickname} - Inforum`,
    description: `${nickname}의 마이페이지입니다.`,
  };
}
