'use client';

import { Memo } from '@/types/memo';
import MemosGrid from '../memo/MemosGrid';
import BarBtn from '@/components/shared/btn/BarBtn';
import { useState } from 'react';
import {
  getAnswerdQuestionsByUserId,
  getLikedMemosByUserId,
  getLikedQuestionsByUserId,
  getMemosByUserId,
  getQuestionsByUserId,
} from '@/service/me';
import CategoryBtn from '../shared/btn/CategoryBtn';
import { Question } from '@/types/question';
import QuestionsList from '../question/QuestionsList';

type Props = {
  memos: Memo[];
  userId: number;
};

export default function MeMainContainer({ memos, userId }: Props) {
  const [memodata, setMemodata] = useState<Memo[]>(memos);
  const [questiondata, setQuestionData] = useState<Question[]>([]);
  const [selectedBigCategory, setSelectedBigCategory] = useState<
    'my' | 'answered' | 'liked'
  >('my');
  const [selectedPostType, setSelectedPostType] = useState<'memo' | 'question'>(
    'memo'
  );
  const handleClick = async (type: 'my' | 'answered' | 'liked') => {
    if (type === 'answered') {
      const questions = await getAnswerdQuestionsByUserId(userId);
      setQuestionData(questions);
    } else {
      const memos =
        type === 'my'
          ? await getMemosByUserId(userId)
          : await getLikedMemosByUserId(userId);
      setMemodata(memos);
      setSelectedPostType('memo');
    }
    setSelectedBigCategory(type);
  };

  const handlePostCategotyClick = async (type: 'memo' | 'question') => {
    let data;
    switch (type) {
      case 'memo':
        data =
          selectedBigCategory === 'my'
            ? await getMemosByUserId(userId)
            : await getLikedMemosByUserId(userId);
        setMemodata(data);
        setSelectedPostType('memo');
        break;
      case 'question':
        data =
          selectedBigCategory === 'my'
            ? await getQuestionsByUserId(userId)
            : await getLikedQuestionsByUserId(userId);
        setQuestionData(data);
        setSelectedPostType('question');
        break;
      default:
        throw new Error('알맞은 타입이 아님');
    }
  };

  return (
    <div className="grow w-full sm:px-4 sm:py-2">
      <div className="flex w-full justify-around my-4">
        <BarBtn
          text="내 글"
          onClick={() => handleClick('my')}
          isSelected={selectedBigCategory === 'my'}
        />
        <BarBtn
          text="내가 답변한 질문"
          onClick={() => handleClick('answered')}
          isSelected={selectedBigCategory === 'answered'}
        />
        <BarBtn
          text="좋아요"
          onClick={() => handleClick('liked')}
          isSelected={selectedBigCategory === 'liked'}
        />
      </div>
      {selectedBigCategory !== 'answered' && (
        <div className="flex gap-2 my-4">
          <CategoryBtn
            text="memo"
            onClick={() => handlePostCategotyClick('memo')}
            isSelected={selectedPostType === 'memo'}
          />
          <CategoryBtn
            text="question"
            onClick={() => handlePostCategotyClick('question')}
            isSelected={selectedPostType === 'question'}
          />
        </div>
      )}
      {selectedBigCategory !== 'answered' && selectedPostType === 'memo' && (
        <MemosGrid memos={memodata} colNum={3} />
      )}
      {selectedBigCategory === 'answered' ||
        (selectedPostType === 'question' && (
          <QuestionsList questions={questiondata} size="big" />
        ))}
    </div>
  );
}
