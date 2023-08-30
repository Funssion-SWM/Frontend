import Comment from './Comment';

export default function Comments() {
  const mockData = [
    {
      title: 'async, await이 무엇인가요??',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, nesciunt provident pariatur inventore deserunt porro assumenda at quae tempora deleniti aliquid veniam numquam hic magnam aspernatur impedit dolorem exercitationem officiis.',
    },
    {
      title: 'async, await이 무엇인가요??',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, nesciunt provident pariatur inventore deserunt porro assumenda at quae tempora deleniti aliquid veniam numquam hic magnam aspernatur impedit dolorem exercitationem officiis.',
    },
    {
      title: 'async, await이 무엇인가요??',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, nesciunt provident pariatur inventore deserunt porro assumenda at quae tempora deleniti aliquid veniam numquam hic magnam aspernatur impedit dolorem exercitationem officiis.',
    },
    {
      title: 'async, await이 무엇인가요??',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, nesciunt provident pariatur inventore deserunt porro assumenda at quae tempora deleniti aliquid veniam numquam hic magnam aspernatur impedit dolorem exercitationem officiis.',
    },
    {
      title: 'async, await이 무엇인가요??',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, nesciunt provident pariatur inventore deserunt porro assumenda at quae tempora deleniti aliquid veniam numquam hic magnam aspernatur impedit dolorem exercitationem officiis.',
    },
    {
      title: 'async, await이 무엇인가요??',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, nesciunt provident pariatur inventore deserunt porro assumenda at quae tempora deleniti aliquid veniam numquam hic magnam aspernatur impedit dolorem exercitationem officiis.',
    },
    {
      title: 'async, await이 무엇인가요??',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, nesciunt provident pariatur inventore deserunt porro assumenda at quae tempora deleniti aliquid veniam numquam hic magnam aspernatur impedit dolorem exercitationem officiis.',
    },
    {
      title: 'async, await이 무엇인가요??',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, nesciunt provident pariatur inventore deserunt porro assumenda at quae tempora deleniti aliquid veniam numquam hic magnam aspernatur impedit dolorem exercitationem officiis.',
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
