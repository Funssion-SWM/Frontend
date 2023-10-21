'use client';

import { Memo } from '@/types/memo';
import MemosGrid from '../memo/MemosGrid';
import BarBtn from '@/components/shared/btn/BarBtn';
import { useEffect, useRef, useState } from 'react';
import {
  getAnswerdQuestionsByUserId,
  getLikedMemosByUserId,
  getLikedQuestionsByUserId,
  getLikedSeriesByUserId,
  getMemosByUserId,
  getQuestionsByUserId,
  getSeriesByUserId,
} from '@/service/me';
import CategoryBtn from '../shared/btn/CategoryBtn';
import { Question } from '@/types/question';
import QuestionsList from '../question/QuestionsList';
import { Series } from '@/types/series';
import SeriesGrid from '../series/SeriesGrid';
import useObserver from '@/hooks/useObserver';

type Props = {
  memos: Memo[];
  userId: number;
};

type BigCategory = 'my' | 'answered' | 'liked';
type PostType = 'memo' | 'question' | 'series';

export default function MeMainContainer({ memos, userId }: Props) {
  const [memoData, setMemoData] = useState<Memo[]>(memos);
  const [questionData, setQuestionData] = useState<Question[]>([]);
  const [seriesData, setSeriesData] = useState<Series[]>([]);
  const [selectedBigCategory, setSelectedBigCategory] =
    useState<BigCategory>('my');
  const [selectedPostType, setSelectedPostType] = useState<PostType>('memo');
  const [pageNum, setPageNum] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isInitialMount = useRef(true);

  const handleClick = async (type: BigCategory) => {
    setIsLoading(true);
    setPageNum(0);
    setIsEnd(false);
    if (type === 'answered') {
      const questions = await getAnswerdQuestionsByUserId(userId);
      setQuestionData(questions);
    } else {
      const memos =
        type === 'my'
          ? await getMemosByUserId(userId)
          : await getLikedMemosByUserId(userId);
      setMemoData(memos);
      setSelectedPostType('memo');
    }
    setIsLoading(false);
    setSelectedBigCategory(type);
  };

  const handlePostCategotyClick = async (type: PostType) => {
    setIsLoading(true);
    setPageNum(0);
    setIsEnd(false);
    let data;
    switch (type) {
      case 'memo':
        data =
          selectedBigCategory === 'my'
            ? await getMemosByUserId(userId)
            : await getLikedMemosByUserId(userId);
        setMemoData(data);
        break;
      case 'question':
        data =
          selectedBigCategory === 'my'
            ? await getQuestionsByUserId(userId)
            : await getLikedQuestionsByUserId(userId);
        setQuestionData(data);
        break;
      case 'series':
        data =
          selectedBigCategory === 'my'
            ? await getSeriesByUserId(userId)
            : await getLikedSeriesByUserId(userId);
        setSeriesData(data);
        break;
      default:
        throw new Error('알맞은 타입이 아님');
    }
    setIsLoading(false);
    setSelectedPostType(type);
  };

  const fetchPosts = () => {
    if (isLoading || isEnd) return;
    setIsLoading(true);
    if (selectedBigCategory === 'answered') {
      getAnswerdQuestionsByUserId(userId, pageNum)
        .then((questions) => {
          setIsLoading(false);
          if (!questions.length) setIsEnd(true);
          else setQuestionData([...questionData, ...questions]);
        })
        .catch(() => setIsLoading(false));
    } else {
      let data;
      switch (selectedPostType) {
        case 'memo':
          data =
            selectedBigCategory === 'my'
              ? getMemosByUserId(userId, pageNum)
              : getLikedMemosByUserId(userId, pageNum);
          data
            .then((memos) => {
              setIsLoading(false);
              if (!memos.length) setIsEnd(true);
              else {
                setMemoData([...memoData, ...memos]);
              }
            })
            .catch(() => setIsLoading(false));
          break;
        case 'question':
          data =
            selectedBigCategory === 'my'
              ? getQuestionsByUserId(userId, pageNum)
              : getLikedQuestionsByUserId(userId, pageNum);
          data
            .then((questions) => {
              setIsLoading(false);
              if (!questions.length) setIsEnd(true);
              else {
                setQuestionData([...questionData, ...questions]);
              }
            })
            .catch(() => setIsLoading(false));
          break;
        case 'series':
          data =
            selectedBigCategory === 'my'
              ? getSeriesByUserId(userId, pageNum)
              : getLikedSeriesByUserId(userId, pageNum);
          data
            .then((seriesArray) => {
              setIsLoading(false);
              if (!seriesArray.length) setIsEnd(true);
              else {
                setSeriesData([...seriesData, ...seriesArray]);
              }
            })
            .catch(() => setIsLoading(false));
          break;
        default:
          throw new Error('알맞은 타입이 아님');
      }
    }
  };

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
          <CategoryBtn
            text="series"
            onClick={() => handlePostCategotyClick('series')}
            isSelected={selectedPostType === 'series'}
          />
        </div>
      )}
      {selectedBigCategory !== 'answered' && selectedPostType === 'memo' && (
        <MemosGrid memos={memoData} colNum={3} />
      )}
      {(selectedBigCategory === 'answered' ||
        selectedPostType === 'question') && (
        <QuestionsList questions={questionData} size="big" />
      )}
      {selectedBigCategory !== 'answered' && selectedPostType === 'series' && (
        <SeriesGrid seriesArr={seriesData} colNum={3} />
      )}
      {isEnd ? <></> : <div ref={setTarget} />}
    </div>
  );
}
