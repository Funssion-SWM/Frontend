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
    },
    {
      id: 2,
      authorId: 1,
      authorName: 'dongree',
      authorImagePath: '',
      createdDate: '2023-09-26',
      updatedDate: '2023-09-26',
      likes: 0,
      title: 'testTitle2',
      text: '{"type": "doc", "content": [{"type": "paragraph", "content": [{"text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio voluptates expedita odit dolores, aspernatur laudantium eaque maxime nesciunt velit quasi officia. Enim libero alias rerum, tenetur quos minima error rem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio voluptates expedita odit dolores, aspernatur laudantium eaque maxime nesciunt velit quasi officia. Enim libero alias rerum, tenetur quos minima error rem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio voluptates expedita odit dolores, aspernatur laudantium eaque maxime nesciunt velit quasi officia. Enim libero alias rerum, tenetur quos minima error rem!", "type": "text"}]}]}',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio voluptates expedita odit dolores, aspernatur laudantium eaque maxime nesciunt velit quasi officia. Enim libero alias rerum, tenetur quos minima error rem!',
      tags: ['test', 'test2'],
      likesCount: 0,
      answerCount: 0,
      solved: false,
    },
    {
      id: 3,
      authorId: 1,
      authorName: 'dongree',
      authorImagePath: '',
      createdDate: '2023-09-26',
      updatedDate: '2023-09-26',
      likes: 0,
      title: 'testTitle3',
      text: '{"type": "doc", "content": [{"type": "paragraph", "content": [{"text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio voluptates expedita odit dolores, aspernatur laudantium eaque maxime nesciunt velit quasi officia. Enim libero alias rerum, tenetur quos minima error rem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio voluptates expedita odit dolores, aspernatur laudantium eaque maxime nesciunt velit quasi officia. Enim libero alias rerum, tenetur quos minima error rem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio voluptates expedita odit dolores, aspernatur laudantium eaque maxime nesciunt velit quasi officia. Enim libero alias rerum, tenetur quos minima error rem!", "type": "text"}]}]}',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio voluptates expedita odit dolores, aspernatur laudantium eaque maxime nesciunt velit quasi officia. Enim libero alias rerum, tenetur quos minima error rem!',
      tags: ['test', 'test2'],
      likesCount: 0,
      answerCount: 0,
      solved: false,
    },
  ];
  const myData = checkUser(cookie);
  const [{ id, isLogin }] = await Promise.all([myData]);

  const { profileImageFilePath } = isLogin
    ? await getUserInfo(id)
    : { profileImageFilePath: undefined };

  return (
    <section>
      <Header
        isLogin={isLogin}
        profileImageFilePath={profileImageFilePath}
        currentPage="questions"
      />
      <LayoutWrapper paddingY="sm:py-5">
        <QuestionsContainer questions={questions} />
      </LayoutWrapper>
      <Footer />
    </section>
  );
}
