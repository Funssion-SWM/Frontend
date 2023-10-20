import { UserInfo } from '@/types';
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
    <div className="mt-10">
      <div className="flex flex-wrap justify-center items-center mx-10 sm:text-2xl font-bold">
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
      <ul className="flex justify-center w-3/4 flex-wrap mx-auto mt-10">
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
