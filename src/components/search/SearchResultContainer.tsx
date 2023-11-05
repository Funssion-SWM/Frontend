'use client';

import { Memo } from '@/types/memo';
import { Orderby } from '@/types';
import { useEffect, useRef, useState } from 'react';
import { searchMemos } from '@/service/search';
import CategoryBtn from '@/components/shared/btn/CategoryBtn';
import MemosGrid from '../memo/MemosGrid';
import { useDebounce } from '@/hooks/useDebounce';
import { SEARCH_RESULT_TIME } from '@/utils/const';
import BarBtn from '../shared/btn/BarBtn';
import QuestionsList from '../question/QuestionsList';
import { Question } from '@/types/question';
import { searchQuestions, searchSeries } from '@/service/search';
import { notifyToast } from '@/service/notify';
import { Series } from '@/types/series';
import SeriesGrid from '../series/SeriesGrid';
import useObserver from '@/hooks/useObserver';

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
  const [pageNum, setPageNum] = useState(-1);
  const [isEnd, setIsEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isInitialMount = useRef(true);

  const tempSearchString = useDebounce(searchString, SEARCH_RESULT_TIME);

  const updatePosts = async (
    searchString: string,
    type: PostType,
    orderBy: Orderby
  ) => {
    switch (type) {
      case 'memo':
        searchMemos(searchString, orderBy, isTag, userId).then((res) => {
          if ('code' in res) {
            notifyToast(res.message, 'error');
            return;
          }
          setMemoData(res);
        });
        break;
      case 'question':
        searchQuestions(tempSearchString, orderBy, isTag, userId).then(
          (res) => {
            if ('code' in res) {
              notifyToast(res.message, 'error');
              return;
            }
            setQuestionData(res);
          }
        );
        break;
      case 'series':
        searchSeries(tempSearchString, orderBy).then((res) => {
          if ('code' in res) {
            notifyToast(res.message, 'error');
            return;
          }
          setSeriesData(res);
        });
        break;
      default:
        throw new Error('알맞은 타입이 아님');
    }
  };

  const handlePostCategotyClick = async (type: PostType) => {
    if (type === postType) return;
    setIsLoading(true);
    setPageNum(0);
    setIsEnd(false);
    setSelectedOrderType('hot');
    await updatePosts(tempSearchString, type, 'hot');
    setIsLoading(false);
    setPostType(type);
  };

  const handleOrderByCategoryClick = async (orderBy: Orderby) => {
    if (orderBy === selectedOrderType) return;
    setIsLoading(true);
    setPageNum(0);
    setIsEnd(false);

    await updatePosts(tempSearchString, postType, orderBy);
    setIsLoading(false);
    setSelectedOrderType(orderBy);
  };

  const fetchPosts = async () => {
    if (isLoading || isEnd) return;
    setIsLoading(true);
    switch (postType) {
      case 'memo': {
        searchMemos(tempSearchString, selectedOrderType, isTag, userId, pageNum)
          .then((res) => {
            if ('code' in res) {
              notifyToast(res.message, 'error');
              return;
            }
            setIsLoading(false);
            if (!res.length) setIsEnd(true);
            else setMemoData([...memoData, ...res]);
          })
          .catch(() => setIsLoading(false));
        break;
      }
      case 'question': {
        searchQuestions(
          tempSearchString,
          selectedOrderType,
          isTag,
          userId,
          pageNum
        )
          .then((res) => {
            if ('code' in res) {
              notifyToast(res.message, 'error');
              return;
            }
            setIsLoading(false);
            if (!res.length) setIsEnd(true);
            else setQuestionData([...questionData, ...res]);
          })
          .catch(() => setIsLoading(false));
        break;
      }
      case 'series': {
        searchSeries(tempSearchString, selectedOrderType, pageNum)
          .then((res) => {
            if ('code' in res) {
              notifyToast(res.message, 'error');
              return;
            }
            setIsLoading(false);
            if (!res.length) setIsEnd(true);
            else setSeriesData([...seriesData, ...res]);
          })
          .catch(() => setIsLoading(false));
        break;
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setPageNum(0);
    setIsEnd(false);
    updatePosts(tempSearchString, postType, selectedOrderType).then(() =>
      setIsLoading(false)
    );
  }, [tempSearchString]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      fetchPosts();
    }
  }, [pageNum]);

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    if (isEnd || isLoading) return;
    entry.isIntersecting && setPageNum(pageNum + 1);
  };

  const { setTarget } = useObserver({ onIntersect });

  return (
    <div>
      <div className="flex mb-2">
        <BarBtn
          isSelected={postType === 'memo'}
          text="Memos"
          onClick={() => handlePostCategotyClick('memo')}
        />
        <BarBtn
          isSelected={postType === 'question'}
          text="Questions"
          onClick={() => handlePostCategotyClick('question')}
        />
        {!isTag && (
          <BarBtn
            isSelected={postType === 'series'}
            text="Series"
            onClick={() => handlePostCategotyClick('series')}
          />
        )}
      </div>
      <div className="flex gap-2 ml-1">
        <CategoryBtn
          text="Hot"
          onClick={() => handleOrderByCategoryClick('hot')}
          size="big"
          isSelected={selectedOrderType === 'hot'}
        />
        <CategoryBtn
          text="New"
          onClick={() => handleOrderByCategoryClick('new')}
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
      {isEnd ? <></> : <div ref={setTarget} />}
    </div>
  );
}
