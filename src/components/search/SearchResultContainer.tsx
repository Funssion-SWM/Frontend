'use client';

import { Memo } from '@/types/memo';
import { Orderby } from '@/types';
import { useEffect, useState } from 'react';
import { searchMemos } from '@/service/memos';
import CategoryBtn from '@/components/shared/btn/CategoryBtn';
import MemosGrid from '../memo/MemosGrid';
import { useDebounce } from '@/hooks/useDebounce';
import { SEARCH_RESULT_TIME } from '@/utils/const';
import BarBtn from '../shared/btn/BarBtn';
import QuestionsList from '../question/QuestionsList';
import { Question } from '@/types/question';
import { searchQuestions, searchSeries } from '@/service/search';
import { notifyToast } from '@/service/notification';
import { Series } from '@/types/series';
import SeriesGrid from '../series/SeriesGrid';

type Props = {
  searchString: string;
  isTag: boolean;
  userId: string;
};

type PostType = 'memo' | 'question' | 'series';

export default function SearchResultContainer({
  searchString,
  isTag,
  userId,
}: Props) {
  const [memoData, setMemoData] = useState<Memo[]>([]);
  const [questionData, setQuestionData] = useState<Question[]>([]);
  const [seriesData, setSeriesData] = useState<Series[]>([]);
  const [selectedOrderType, setSelectedOrderType] = useState<Orderby>('hot');
  const [postType, setPostType] = useState<PostType>('memo');

  const tempSearchString = useDebounce(searchString, SEARCH_RESULT_TIME);

  const fetchPost = async () => {
    switch (postType) {
      case 'memo': {
        searchMemos(tempSearchString, selectedOrderType, isTag, userId).then(
          (res) => {
            if ('code' in res) {
              notifyToast(res.message, 'error');
              return;
            }
            setMemoData(res);
          }
        );
        return;
      }
      case 'question': {
        searchQuestions(
          tempSearchString,
          selectedOrderType,
          isTag,
          userId
        ).then((res) => {
          if ('code' in res) {
            notifyToast(res.message, 'error');
            return;
          }
          setQuestionData(res);
        });
        return;
      }
      case 'series': {
        searchSeries(tempSearchString, selectedOrderType).then((res) => {
          if ('code' in res) {
            notifyToast(res.message, 'error');
            return;
          }
          setSeriesData(res);
        });
      }
    }
  };

  useEffect(() => {
    fetchPost();
  }, [tempSearchString, postType, selectedOrderType]);

  return (
    <div>
      <div className="flex mb-2">
        <BarBtn
          isSelected={postType === 'memo'}
          text="Memos"
          onClick={() => {
            setSelectedOrderType('hot');
            setPostType('memo');
          }}
        />
        <BarBtn
          isSelected={postType === 'question'}
          text="Questions"
          onClick={() => {
            setSelectedOrderType('hot');
            setPostType('question');
          }}
        />
        <BarBtn
          isSelected={postType === 'series'}
          text="Series"
          onClick={() => {
            setSelectedOrderType('hot');
            setPostType('series');
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
        <span className="text-soma-blue-40">
          {
            {
              memo: memoData.length,
              question: questionData.length,
              series: seriesData.length,
            }[postType]
          }
          개
        </span>
        의 검색 결과가 있습니다.
      </div>
      {
        {
          memo: <MemosGrid memos={memoData} colNum={4} />,
          question: <QuestionsList questions={questionData} size="big" />,
          series: <SeriesGrid seriesArr={seriesData} colNum={4} />,
        }[postType]
      }
    </div>
  );
}
