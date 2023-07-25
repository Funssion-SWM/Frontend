import HistoryBox from './HistoryBox';

export default function History() {
  const data = [
    {
      date: '2023-07-24',
      postCnt: 0,
    },
    {
      date: '2023-07-25',
      postCnt: 1,
    },
    {
      date: '2023-07-24',
      postCnt: 2,
    },
    {
      date: '2023-07-25',
      postCnt: 3,
    },
    {
      date: '2023-07-24',
      postCnt: 3,
    },
    {
      date: '2023-07-25',
      postCnt: 4,
    },
    {
      date: '2023-07-24',
      postCnt: 5,
    },
    {
      date: '2023-07-24',
      postCnt: 10,
    },
    {
      date: '2023-07-25',
      postCnt: 8,
    },
    {
      date: '2023-07-24',
      postCnt: 3,
    },
    {
      date: '2023-07-25',
      postCnt: 7,
    },
    {
      date: '2023-07-24',
      postCnt: 6,
    },
    {
      date: '2023-07-25',
      postCnt: 9,
    },
    {
      date: '2023-07-24',
      postCnt: 5,
    },
    {
      date: '2023-07-24',
      postCnt: 13,
    },
    {
      date: '2023-07-25',
      postCnt: 17,
    },
    {
      date: '2023-07-24',
      postCnt: 1,
    },
    {
      date: '2023-07-25',
      postCnt: 0,
    },
    {
      date: '2023-07-24',
      postCnt: 1,
    },
    {
      date: '2023-07-25',
      postCnt: 3,
    },
    {
      date: '2023-07-24',
      postCnt: 1,
    },
    {
      date: '2023-07-24',
      postCnt: 9,
    },
    {
      date: '2023-07-25',
      postCnt: 4,
    },
    {
      date: '2023-07-24',
      postCnt: 1,
    },
    {
      date: '2023-07-25',
      postCnt: 5,
    },
    {
      date: '2023-07-24',
      postCnt: 5,
    },
    {
      date: '2023-07-25',
      postCnt: 7,
    },
    {
      date: '2023-07-24',
      postCnt: 4,
    },
    {
      date: '2023-07-24',
      postCnt: 0,
    },
    {
      date: '2023-07-25',
      postCnt: 1,
    },
    {
      date: '2023-07-24',
      postCnt: 2,
    },
    {
      date: '2023-07-25',
      postCnt: 3,
    },
    {
      date: '2023-07-24',
      postCnt: 3,
    },
    {
      date: '2023-07-25',
      postCnt: 4,
    },
    {
      date: '2023-07-24',
      postCnt: 5,
    },
    {
      date: '2023-07-24',
      postCnt: 10,
    },
    {
      date: '2023-07-25',
      postCnt: 8,
    },
    {
      date: '2023-07-24',
      postCnt: 3,
    },
    {
      date: '2023-07-25',
      postCnt: 7,
    },
    {
      date: '2023-07-24',
      postCnt: 6,
    },
    {
      date: '2023-07-25',
      postCnt: 9,
    },
    {
      date: '2023-07-24',
      postCnt: 5,
    },
    {
      date: '2023-07-24',
      postCnt: 13,
    },
    {
      date: '2023-07-25',
      postCnt: 17,
    },
    {
      date: '2023-07-24',
      postCnt: 1,
    },
    {
      date: '2023-07-25',
      postCnt: 0,
    },
    {
      date: '2023-07-24',
      postCnt: 1,
    },
    {
      date: '2023-07-25',
      postCnt: 3,
    },
    {
      date: '2023-07-24',
      postCnt: 1,
    },
    {
      date: '2023-07-24',
      postCnt: 9,
    },
    {
      date: '2023-07-25',
      postCnt: 4,
    },
    {
      date: '2023-07-24',
      postCnt: 1,
    },
    {
      date: '2023-07-25',
      postCnt: 5,
    },
    {
      date: '2023-07-24',
      postCnt: 5,
    },
    {
      date: '2023-07-25',
      postCnt: 7,
    },
    {
      date: '2023-07-24',
      postCnt: 4,
    },
  ];

  return (
    <section className="self-start w-full mt-5">
      <p className="font-semibold my-2">History</p>
      <div className="grid grid-cols-7 gap-2 bg-white p-2">
        {data.map((item) => (
          <HistoryBox key={item.date} item={item} />
        ))}
      </div>
    </section>
  );
}
