import HistoryBox from '../HistoryBox';

export default function History() {
  const data = [
    {
      date: '2023-06-03',
      postCnt: 0,
    },
    {
      date: '2023-06-04',
      postCnt: 1,
    },
    {
      date: '2023-06-05',
      postCnt: 2,
    },
    {
      date: '2023-06-06',
      postCnt: 3,
    },
    {
      date: '2023-06-07',
      postCnt: 3,
    },
    {
      date: '2023-06-08',
      postCnt: 4,
    },
    {
      date: '2023-06-09',
      postCnt: 5,
    },
    {
      date: '2023-06-10',
      postCnt: 10,
    },
    {
      date: '2023-06-11',
      postCnt: 8,
    },
    {
      date: '2023-06-12',
      postCnt: 3,
    },
    {
      date: '2023-06-13',
      postCnt: 7,
    },
    {
      date: '2023-06-14',
      postCnt: 6,
    },
    {
      date: '2023-06-15',
      postCnt: 9,
    },
    {
      date: '2023-06-16',
      postCnt: 5,
    },
    {
      date: '2023-06-17',
      postCnt: 13,
    },
    {
      date: '2023-06-18',
      postCnt: 17,
    },
    {
      date: '2023-06-19',
      postCnt: 1,
    },
    {
      date: '2023-06-20',
      postCnt: 0,
    },
    {
      date: '2023-06-21',
      postCnt: 1,
    },
    {
      date: '2023-06-22',
      postCnt: 3,
    },
    {
      date: '2023-06-23',
      postCnt: 1,
    },
    {
      date: '2023-06-24',
      postCnt: 9,
    },
    {
      date: '2023-06-25',
      postCnt: 4,
    },
    {
      date: '2023-06-26',
      postCnt: 1,
    },
    {
      date: '2023-06-27',
      postCnt: 5,
    },
    {
      date: '2023-06-28',
      postCnt: 5,
    },
    {
      date: '2023-06-29',
      postCnt: 7,
    },
    {
      date: '2023-06-30',
      postCnt: 4,
    },
    {
      date: '2023-07-01',
      postCnt: 0,
    },
    {
      date: '2023-07-02',
      postCnt: 1,
    },
    {
      date: '2023-07-03',
      postCnt: 2,
    },
    {
      date: '2023-07-04',
      postCnt: 3,
    },
    {
      date: '2023-07-05',
      postCnt: 3,
    },
    {
      date: '2023-07-06',
      postCnt: 4,
    },
    {
      date: '2023-07-07',
      postCnt: 5,
    },
    {
      date: '2023-07-08',
      postCnt: 10,
    },
    {
      date: '2023-07-09',
      postCnt: 8,
    },
    {
      date: '2023-07-10',
      postCnt: 3,
    },
    {
      date: '2023-07-11',
      postCnt: 7,
    },
    {
      date: '2023-07-12',
      postCnt: 6,
    },
    {
      date: '2023-07-13',
      postCnt: 9,
    },
    {
      date: '2023-07-14',
      postCnt: 5,
    },
    {
      date: '2023-07-15',
      postCnt: 13,
    },
    {
      date: '2023-07-16',
      postCnt: 17,
    },
    {
      date: '2023-07-17',
      postCnt: 1,
    },
    {
      date: '2023-07-18',
      postCnt: 0,
    },
    {
      date: '2023-07-19',
      postCnt: 1,
    },
    {
      date: '2023-07-20',
      postCnt: 3,
    },
    {
      date: '2023-07-21',
      postCnt: 1,
    },
    {
      date: '2023-07-22',
      postCnt: 9,
    },
    {
      date: '2023-07-23',
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
      date: '2023-07-26',
      postCnt: 5,
    },
    {
      date: '2023-07-27',
      postCnt: 7,
    },
    {
      date: '2023-07-28',
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
