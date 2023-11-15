import BlueBtn from '@/components/shared/btn/BlueBtn';
import WhiteBtn from '@/components/shared/btn/WhiteBtn';
import { createThreeQuestionsForInterview } from '@/service/mini-interview';
import { notifyToast } from '@/service/notify';
import { azertMono } from '@/styles/fonts';
import { useCompletion } from 'ai/react';
import { useState } from 'react';
import { RingLoader } from 'react-spinners';

type Props = {
  onClose: () => void;
  userId: number | null;
};

const QUESTION_INPUT_STYLE =
  'bg-soma-grey-25 rounded-sm outline-none w-72 text-sm p-1';

export default function KeywordModal({ onClose, userId }: Props) {
  const [keyword1, setKeyword1] = useState('');
  const [keyword2, setKeyword2] = useState('');
  const [keyword3, setKeyword3] = useState('');
  const [question1, setQuestion1] = useState(
    'virtual dom에 대해 설명해주세요. 무엇인가요?'
  );
  const [question2, setQuestion2] = useState('');
  const [question3, setQuestion3] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);

  const questionAI = useCompletion({
    id: 'inforum_question',
    api: '/api/generate/questions',
    onError: (err) => {
      notifyToast(err.message, 'error');
    },
  });

  const handleGenerateQuestions = async () => {
    if (
      keyword1.length === 0 ||
      keyword2.length === 0 ||
      keyword3.length === 0
    ) {
      notifyToast('keyword를 모두 입력해주세요.', 'warning');
      return;
    }

    const textForPrompt = `keyword1:${keyword1}, keyword2:${keyword2}, keyword3:${keyword3}`;
    const questionsString = await questionAI.complete(textForPrompt);
    const questions = JSON.parse(questionsString ?? "['','','']");
    setQuestion1(questions[0]);
    setQuestion2(questions[1]);
    setQuestion3(questions[2]);
    setIsGenerated(true);
  };

  const handleCreateQuestions = () => {
    if (userId === null) {
      console.error('userId가 null임');
      return;
    }

    if (
      question1.length === 0 ||
      question2.length === 0 ||
      question3.length === 0
    ) {
      notifyToast('question을 모두 입력해주세요.', 'warning');
      return;
    }

    createThreeQuestionsForInterview(userId, [
      question1,
      question2,
      question3,
    ]).then((res) => {
      if ('code' in res) {
        notifyToast(res.message, 'error');
        return;
      }
      notifyToast('미니면접이 해당 사용자에게 요청되었습니다.', 'success');
      onClose();
    });
  };

  return questionAI.isLoading ? (
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center bg-white opacity-90">
      <RingLoader className="self-center" color="#4992FF" />
      <div className="text-center font-medium text-soma-grey-60 text-sm my-5">
        AI가 keyword 기반으로 질문들을 자동생성중입니다...
      </div>
    </div>
  ) : (
    <div className="fixed top-0">
      <Overay onClick={onClose} />
      {isGenerated ? (
        <div
          className="fixed flex flex-col shadow-lg items-center bg-white rounded-2xl p-5  
      top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-5 w-[450px] h-[280px]"
        >
          <p className="text-xl font-medium">생성된 질문</p>

          <ul className="flex flex-col gap-2">
            <li>
              <label htmlFor="question1">
                질문 <span className={`${azertMono.className}`}>1</span> :{' '}
              </label>
              <input
                id="question1"
                type="text"
                className={QUESTION_INPUT_STYLE}
                value={question1}
                onChange={(e) => setQuestion1(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="question2">
                질문 <span className={`${azertMono.className}`}>2</span> :{' '}
              </label>
              <input
                id="question2"
                type="text"
                className={QUESTION_INPUT_STYLE}
                value={question2}
                onChange={(e) => setQuestion2(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="question3">
                질문 <span className={`${azertMono.className}`}>3</span> :{' '}
              </label>
              <input
                id="question3"
                type="text"
                className={QUESTION_INPUT_STYLE}
                value={question3}
                onChange={(e) => setQuestion3(e.target.value)}
              ></input>
            </li>
          </ul>
          <div className="flex gap-2">
            <BlueBtn text="확인" onClick={handleCreateQuestions} />
            <WhiteBtn
              text="취소"
              onClick={() => {
                setIsGenerated(false);
                onClose();
              }}
            />
          </div>
        </div>
      ) : (
        <div
          className="fixed flex flex-col shadow-lg items-center bg-white rounded-2xl p-5  
      top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-5 w-[450px] h-[280px]"
        >
          <p className="text-xl font-medium">질문 생성 키워드 설정</p>
          <p className="text-xs text-soma-grey-49">
            키워드를 기반으로 질문이 자동생성됩니다.
          </p>
          <ul className="flex flex-col gap-2">
            <li>
              <label htmlFor="keyword1">
                keyword <span className={`${azertMono.className}`}>1</span> :{' '}
              </label>
              <input
                id="keyword1"
                type="text"
                className="bg-soma-grey-25 rounded-sm outline-none"
                value={keyword1}
                onChange={(e) => setKeyword1(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="keyword2">
                keyword <span className={`${azertMono.className}`}>2</span> :{' '}
              </label>
              <input
                id="keyword2"
                type="text"
                className="bg-soma-grey-25 rounded-sm outline-none"
                value={keyword2}
                onChange={(e) => setKeyword2(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="keyword3">
                keyword <span className={`${azertMono.className}`}>3</span> :{' '}
              </label>
              <input
                id="keyword3"
                type="text"
                className="bg-soma-grey-25 rounded-sm outline-none"
                value={keyword3}
                onChange={(e) => setKeyword3(e.target.value)}
              ></input>
            </li>
          </ul>
          <div className="flex gap-2">
            <BlueBtn text="확인" onClick={handleGenerateQuestions} />
            <WhiteBtn text="취소" onClick={onClose} />
          </div>
        </div>
      )}
    </div>
  );
}

function Overay({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="w-screen h-screen bg-white opacity-50"
      onClick={onClick}
    ></div>
  );
}
