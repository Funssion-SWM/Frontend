import QuestionsContainer from '@/components/question/QuestionsContainer';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { checkUser, getUserInfo } from '@/service/auth';
import { Question } from '@/types/question';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/utils/const';
import { cookies } from 'next/headers';

export default async function QuestionsPage() {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;
  const refreshToken = cookies().get(REFRESH_TOKEN)?.value;
  const cookie = `${ACCESS_TOKEN}=${accessToken}; ${REFRESH_TOKEN}=${refreshToken}`;

  const questions: Question[] = [
    {
      questionId: 1,
      questionTitle: 'testTitle',
      questionText: 'test',
      questionDescription:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio voluptates expedita odit dolores, aspernatur laudantium eaque maxime nesciunt velit quasi officia. Enim libero alias rerum, tenetur quos minima error rem!',
      createdDate: '2023-09-26',
      questionTags: ['test', 'test2'],
    },
    {
      questionId: 2,
      questionTitle: 'test2Title',
      questionText: 'test2',
      questionDescription:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio voluptates expedita odit dolores, aspernatur laudantium eaque maxime nesciunt velit quasi officia. Enim libero alias rerum, tenetur quos minima error rem!',
      createdDate: '2023-09-26',
      questionTags: ['test', 'test2'],
    },
    {
      questionId: 3,
      questionTitle: 'test3Title',
      questionText: 'test3',
      questionDescription:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio voluptates expedita odit dolores, aspernatur laudantium eaque maxime nesciunt velit quasi officia. Enim libero alias rerum, tenetur quos minima error rem!',
      createdDate: '2023-09-26',
      questionTags: ['test', 'test2'],
    },
  ];
  const myData = checkUser(cookie);
  const [{ id, isLogin }] = await Promise.all([myData]);

  const { profileImageFilePath } = isLogin
    ? await getUserInfo(id)
    : { profileImageFilePath: undefined };

  return (
    <section>
      <Header isLogin={isLogin} profileImageFilePath={profileImageFilePath} />
      <LayoutWrapper paddingY="sm:py-5">
        <QuestionsContainer questions={questions} />
      </LayoutWrapper>
      <Footer />
    </section>
  );
}
