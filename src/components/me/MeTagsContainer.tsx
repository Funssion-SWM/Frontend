import { UserInfo } from "@/types";
import TagView from "../shared/TagView";

type Props = {
  tags:string[];
  userInfo:UserInfo;
  userId:number;
}

export default function MeTagsContainer( { tags, userInfo, userId } :Props) {
  return(
    <>
      <div className='flex justify-center text-2xl text-bold mt-10'>
        {
          tags.length >= 2 ? (
            <>
              <span>{userInfo.nickname}님은</span>
                <TagView tagText={tags[0]} color='green' userName={userInfo.nickname}/>
                <TagView tagText={tags[1]} color='green' userName={userInfo.nickname}/>
              <span>의글을 많이 작성했어요.</span>
            </>
          ) : (
            <span>글을 작성해주세요!</span>
          )
        }
      </div>
      <ul className="flex justify-center w-3/4 flex-wrap mx-auto mt-10">
          {tags.map((tagText) => (
            <li key={tagText}>
              <TagView tagText={tagText} color="green" userId={userId} userName={userInfo.nickname}/>
            </li>
          ))}
      </ul>
    </>
  )
}