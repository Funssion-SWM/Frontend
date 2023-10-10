'use client';

import { Memo } from '@/types/memo';
import { Orderby, PostType } from '@/types';
import { useEffect, useState } from 'react';
import { searchMemos } from '@/service/memos';
import CategoryBtn from '@/components/shared/btn/CategoryBtn';
import MemosGrid from '../memo/MemosGrid';
import { useDebounce } from '@/hooks/useDebounce';
import { SEARCH_RESULT_TIME } from '@/utils/const';
import BarBtn from '../shared/btn/BarBtn';
import QuestionsList from '../question/QuestionsList';
import { Question } from '@/types/question';
import { searchQuestions } from '@/service/search';

type Props = {
  searchString: string;
  isTag: boolean;
  userId: string;
};

export default function SearchResultMemosContainer({
  searchString,
  isTag,
  userId,
}: Props) {
  const [memoData, setMemoData] = useState<Memo[]>([]);
  const [questionData, setQuestionData] = useState<Question[]>([]);
  const [selectedOrderType, setSelectedOrderType] = useState<Orderby>('hot');
  const [postType, setPostType] = useState<PostType>('memo');
  const [isSelected, setIsSelected] = useState<boolean>(true);

  const tempSearchString = useDebounce(searchString, SEARCH_RESULT_TIME);

  const fetchPost = async () => {
    switch (postType) {
      case 'memo' : {
        const memos = await searchMemos(
          tempSearchString,
          selectedOrderType,
          isTag,
          userId
        );
        setMemoData(memos);
        return;
      }
      case 'question' : {
        const questions = await searchQuestions(
          tempSearchString,
          selectedOrderType,
          isTag,
          userId
        );
        setQuestionData(questions);
        return;
      }
    }
  };

  useEffect(() => {
    fetchPost();
  }, [tempSearchString, postType, selectedOrderType]);

  return (
    <div>
      <div className='flex mb-2'>
        <BarBtn
          isSelected={isSelected}
          text='Memos'
          onClick={() => {
            setIsSelected(true);
            setPostType('memo');
          }}
        />
        <BarBtn
          isSelected={!isSelected}
          text='Questions'
          onClick={() => {
            setIsSelected(false);
            setPostType('question');
          }}
        />
      </div>
      <div className="flex gap-2 ml-1">
        <CategoryBtn
          text="Hot"
          onClick={() => setSelectedOrderType('hot')}
          size="big"
          isSelected={selectedOrderType === 'hot'}
        />
        <CategoryBtn
          text="New"
          onClick={() => setSelectedOrderType('new')}
          size="big"
          isSelected={selectedOrderType === 'new'}
        />
      </div>
      <div className="my-4 font-medium ml-2">
        <span className="text-soma-blue-40">{{'memo' : memoData.length, 'question' : questionData.length, 'answer' : 0}[postType]}개</span>의 검색
        결과가 있습니다.
      </div>
      {
        {
          'memo': (<MemosGrid memos={memoData} colNum={4} />),
          'question' : (<QuestionsList questions={questionData} size='big'/>),
          'answer' : (<></>)
        }[postType]
      }
    </div>
  );
}
