import Header from '@/components/shared/Header';
import { getHistory, getMemosByUserId } from '@/service/me';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { checkUser, getUserInfo } from '@/service/auth';
import MeMainContainer from '@/components/me/MeMainContainer';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN } from '@/utils/const';
import MeSideBar from '@/components/me/MeSideBar';
import TagView from '@/components/shared/TagView';
import { getUserMostUsedTagsTop2 } from '@/service/tag';

type Props = {
  params: {
    slug: string;
  };
};

export default async function MePage({ params: { slug } }: Props) {
  const cookie = cookies().get(ACCESS_TOKEN)?.value;
  const userId = Number(slug);

  const memos = await getMemosByUserId(userId);
  const userInfo = await getUserInfo(userId);
  const { id, isLogin } = await checkUser(cookie);
  const { nickname, profileImageFilePath } = isLogin
    ? await getUserInfo(id)
    : { nickname: "", profileImageFilePath: undefined };
  const history = await getHistory(
    userId,
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    true
  );
  const tags = await getUserMostUsedTagsTop2(slug, cookie);

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
          <div className='flex flex-col'>
            <div className='flex justify-center text-2xl text-bold mt-10'>
              {
                tags ? (
                  <>
                    <span>{nickname}님은</span>
                    {
                      tags?.map((tagText) =>  (
                        <TagView tagText={tagText} color='green'/>
                      ))
                    }
                    <span>의글을 많이 작성했어요.</span>
                  </>
                ) : (
                  <span>글을 작성해주세요!</span>
                )
              }
            </div>
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
    title: nickname,
  };
}
