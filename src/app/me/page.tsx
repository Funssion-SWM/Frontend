import History from '@/components/History';
import MemosGrid from '@/components/MemosGrid';
import Profile from '@/components/Profile';

export default function MePage() {
  const memos = [
    {
      memoId: 3,
      memoTitle: 'JS Promise란 무엇일까?',
      memoDescription:
        'JS Lorem ipsum adipisicing elit. Molestias laboriosam asperiores, delectus necessitatibus natus, sequi pariatur libero tenetur consequuntur doloribus sit repellendus ipsum.',
      memoText: 'aaa',
      memoColor: 'yellow',
      createdDate: '2023-07-19',
      authorId: 3,
      authorName: '고동우',
    },
    {
      memoId: 6,
      memoTitle: 'JS Promise란 무엇일까?',
      memoDescription:
        'JS Lorem ipsum adipisicing elit. Molestias laboriosam asperiores, delectus necessitatibus natus, sequi pariatur libero tenetur consequuntur doloribus sit repellendus ipsum.',
      memoText: 'aaa',
      memoColor: 'yellow',
      createdDate: '2023-07-19',
      authorId: 3,
      authorName: '고동우',
    },
    {
      memoId: 9,
      memoTitle: 'JS Promise란 무엇일까?',
      memoDescription:
        'JS Lorem ipsum adipisicing elit. Molestias laboriosam asperiores, delectus necessitatibus natus, sequi pariatur libero tenetur consequuntur doloribus sit repellendus ipsum.',
      memoText: 'aaa',
      memoColor: 'yellow',
      createdDate: '2023-07-19',
      authorId: 3,
      authorName: '고동우',
    },
    {
      memoId: 12,
      memoTitle: 'JS Promise란 무엇일까?',
      memoDescription:
        'JS Lorem ipsum adipisicing elit. Molestias laboriosam asperiores, delectus necessitatibus natus, sequi pariatur libero tenetur consequuntur doloribus sit repellendus ipsum.',
      memoText: 'aaa',
      memoColor: 'yellow',
      createdDate: '2023-07-19',
      authorId: 3,
      authorName: '고동우',
    },
    {
      memoId: 15,
      memoTitle: 'JS Promise란 무엇일까?',
      memoDescription:
        'JS Lorem ipsum adipisicing elit. Molestias laboriosam asperiores, delectus necessitatibus natus, sequi pariatur libero tenetur consequuntur doloribus sit repellendus ipsum.',
      memoText: 'aaa',
      memoColor: 'yellow',
      createdDate: '2023-07-19',
      authorId: 3,
      authorName: '고동우',
    },
    {
      memoId: 18,
      memoTitle: 'JS Promise란 무엇일까?',
      memoDescription:
        'JS Lorem ipsum adipisicing elit. Molestias laboriosam asperiores, delectus necessitatibus natus, sequi pariatur libero tenetur consequuntur doloribus sit repellendus ipsum.',
      memoText: 'aaa',
      memoColor: 'yellow',
      createdDate: '2023-07-19',
      authorId: 3,
      authorName: '고동우',
    },
  ];

  return (
    <div className="flex min-h-screen(-header)">
      <section className="w-[300px] p-6 bg-gray-100">
        <Profile />
        <History />
      </section>
      <section className="grow w-full p-6">
        <h3 className="font-bold text-2xl mb-1">My Memos</h3>
        <MemosGrid memos={memos} />
      </section>
    </div>
  );
}
