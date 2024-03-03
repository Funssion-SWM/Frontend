import { UserInfo } from '@/types/auth';
import TagView from '../shared/TagView';

type Props = {
  tags: string[];
  userInfo: UserInfo;
  userId: number;
  isLogin: boolean;
};

export default function MeTagsContainer({
  tags,
  userInfo,
  userId,
  isLogin,
}: Props) {
  return (
    <div className="my-10">
      <div className="flex flex-wrap items-center justify-center mx-10 font-bold sm:text-2xl">
        <span>{userInfo.nickname}님은</span>
        <TagView
          tagText={tags[0]}
          color="green"
          userName={userInfo.nickname}
          userId={userId}
          isLogin={isLogin}
        />
        <TagView
          tagText={tags[1]}
          color="green"
          userName={userInfo.nickname}
          userId={userId}
          isLogin={isLogin}
        />
        <span>의 글을 많이 작성했어요.</span>
      </div>
      <ul className="flex flex-wrap justify-center w-3/4 mx-auto mt-10">
        {tags.map((tagText) => (
          <li key={tagText}>
            <TagView
              tagText={tagText}
              color="green"
              userId={userId}
              userName={userInfo.nickname}
              isLogin={isLogin}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
