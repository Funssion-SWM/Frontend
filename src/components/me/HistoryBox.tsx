import { HistoryItem } from '@/types';

type Props = {
  item: HistoryItem;
};

export default function HistoryBox({ item }: Props) {
  const postCnt =
    item.answerCnt + item.memoCnt + item.questionCnt + item.blogCnt;
  const isWriteMemo = item.memoCnt != 0 ? 1 : 0;
  const isWriteQuestion = item.questionCnt != 0 ? 1 : 0;
  const isWriteAnswer = item.answerCnt != 0 ? 1 : 0;
  return (
    <div
      className={`w-6 h-6 rounded group relative ${
        {
          0: 'bg-soma-blue-10',
          1: 'bg-soma-blue-30',
          2: 'bg-soma-blue-40',
          3: 'bg-soma-blue-50',
          4: 'bg-soma-blue-60',
        }[(postCnt >= 4 && 4) || postCnt % 4]
      }`}
    >
      <div
        className={`w-20 bg-gray-800 text-white absolute invisible group-hover:visible z-10 text-xs rounded-md p-1 ${
          {
            0: '-top-[40px]',
            1: '-top-[40px]',
            2: '-top-[56px]',
            3: '-top-[72px]',
          }[isWriteMemo + isWriteQuestion + isWriteAnswer]
        }`}
      >
        <p>{item.date}</p>
        {postCnt === 0 ? <p>{postCnt} Posts</p> : <></>}
        {isWriteMemo ? <p>{item.memoCnt} Memos</p> : <></>}
        {isWriteQuestion != 0 ? <p>{item.questionCnt} Questions</p> : <></>}
        {isWriteAnswer != 0 ? <p>{item.answerCnt} Answers</p> : <></>}
      </div>
    </div>
  );
}
