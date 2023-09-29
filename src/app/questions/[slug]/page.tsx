import QuestionDetail from '@/components/question/QuestionDetail';
import Header from '@/components/shared/Header';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { checkUser, getUserInfo } from '@/service/auth';
import { Question } from '@/types/question';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/utils/const';
import { cookies } from 'next/headers';

type Props = {
  params: {
    slug: number;
  };
};

export default async function QuestionPage({ params: slug }: Props) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;
  const refreshToken = cookies().get(REFRESH_TOKEN)?.value;
  const cookie = `${ACCESS_TOKEN}=${accessToken}; ${REFRESH_TOKEN}=${refreshToken}`;

  const myData = checkUser(cookie);
  const [{ id, isLogin }] = await Promise.all([myData]);

  const { profileImageFilePath } = isLogin
    ? await getUserInfo(id)
    : { profileImageFilePath: undefined };

  const questionData: Question = {
    id: 1,
    authorId: 1,
    authorName: 'dongree',
    authorImagePath: '',
    createdDate: '2023-09-26',
    updatedDate: '2023-09-26',
    likes: 0,
    title: 'testTitle',
    text: '{"type": "doc", "content": [{"type": "paragraph", "content": [{"text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio voluptates expedita odit dolores, aspernatur laudantium eaque maxime nesciunt velit quasi officia. Enim libero alias rerum, tenetur quos minima error rem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio voluptates expedita odit dolores, aspernatur laudantium eaque maxime nesciunt velit quasi officia. Enim libero alias rerum, tenetur quos minima error rem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio voluptates expedita odit dolores, aspernatur laudantium eaque maxime nesciunt velit quasi officia. Enim libero alias rerum, tenetur quos minima error rem!", "type": "text"}]}]}',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio voluptates expedita odit dolores, aspernatur laudantium eaque maxime nesciunt velit quasi officia. Enim libero alias rerum, tenetur quos minima error rem!',
    tags: ['test', 'test2'],
    likesCount: 0,
    answerCount: 0,
    solved: false,
  };

  return (
    <section>
      <Header
        isLogin={isLogin}
        profileImageFilePath={profileImageFilePath}
        currentPage="questions"
      />
      <LayoutWrapper>
        <QuestionDetail questionData={questionData} />
      </LayoutWrapper>
    </section>
  );
}
