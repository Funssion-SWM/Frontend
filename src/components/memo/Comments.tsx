import Comment from './Comment';

export default function Comments() {
  const mockData = [
    {
      text: 'async, await이 무엇인가요??',
    },
    {
      text: 'async, await이 무엇인가요??',
    },
    {
      text: 'async, await이 무엇인가요??',
    },
    {
      text: 'async, await이 무엇인가요??',
    },
    {
      text: 'async, await이 무엇인가요??',
    },
    {
      text: 'async, await이 무엇인가요??',
    },
    {
      text: 'async, await이 무엇인가요??',
    },
    {
      text: 'async, await이 무엇인가요??',
    },
  ];
  return (
    <div className="flex flex-col">
      {mockData.map((item, idx) => (
        <Comment key={idx} commentProperty={item} />
      ))}
    </div>
  );
}
