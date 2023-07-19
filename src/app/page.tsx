import MemosGrid from '@/components/MemosGrid';

export default async function HomePage() {
  const memos = [
    {
      memoId: 1,
      memoTitle: 'JDK란?',
      memoText:
        'JDK이다 Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias laboriosam asperiores, delectus necessitatibus natus, sequi pariatur libero tenetur consequuntur doloribus sit repellendus ipsum magni temporibus placeat hic rem.',
      memoColor: 'green',
      createdDate: '2023-07-19',
      authorId: '1',
      authorName: '정진우',
    },
    {
      memoId: 2,
      memoTitle: 'JPA란?',
      memoText:
        'JPA이다 Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias laboriosam asperiores, delectus necessitatibus natus, sequi pariatur libero tenetur consequuntur doloribus sit repellendus ipsum magni temporibus placeat hic rem.',
      memoColor: 'red',
      createdDate: '2023-07-19',
      authorId: '2',
      authorName: '김태훈',
    },
    {
      memoId: 3,
      memoTitle: 'JS Promise란 무엇일까?',
      memoText:
        'JS Lorem ipsum adipisicing elit. Molestias laboriosam asperiores, delectus necessitatibus natus, sequi pariatur libero tenetur consequuntur doloribus sit repellendus ipsum.',
      memoColor: 'yellow',
      createdDate: '2023-07-19',
      authorId: '3',
      authorName: '고동우',
    },
    {
      memoId: 4,
      memoTitle: 'JDK란?',
      memoText:
        'JDK이다 Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias laboriosam asperiores, delectus necessitatibus natus, sequi pariatur libero tenetur consequuntur doloribus sit repellendus ipsum magni temporibus placeat hic rem.',
      memoColor: 'green',
      createdDate: '2023-07-19',
      authorId: '1',
      authorName: '정진우',
    },
    {
      memoId: 5,
      memoTitle: 'JPA란?',
      memoText:
        'JPA이다 Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias laboriosam asperiores, delectus necessitatibus natus, sequi pariatur libero tenetur consequuntur doloribus sit repellendus ipsum magni temporibus placeat hic rem.',
      memoColor: 'red',
      createdDate: '2023-07-19',
      authorId: '2',
      authorName: '김태훈',
    },
    {
      memoId: 6,
      memoTitle: 'JS Promise란 무엇일까?',
      memoText:
        'JS Lorem ipsum adipisicing elit. Molestias laboriosam asperiores, delectus necessitatibus natus, sequi pariatur libero tenetur consequuntur doloribus sit repellendus ipsum.',
      memoColor: 'yellow',
      createdDate: '2023-07-19',
      authorId: '3',
      authorName: '고동우',
    },
    {
      memoId: 7,
      memoTitle: 'JDK란?',
      memoText:
        'JDK이다 Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias laboriosam asperiores, delectus necessitatibus natus, sequi pariatur libero tenetur consequuntur doloribus sit repellendus ipsum magni temporibus placeat hic rem.',
      memoColor: 'green',
      createdDate: '2023-07-19',
      authorId: '1',
      authorName: '정진우',
    },
    {
      memoId: 8,
      memoTitle: 'JPA란?',
      memoText:
        'JPA이다 Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias laboriosam asperiores, delectus necessitatibus natus, sequi pariatur libero tenetur consequuntur doloribus sit repellendus ipsum magni temporibus placeat hic rem.',
      memoColor: 'red',
      createdDate: '2023-07-19',
      authorId: '2',
      authorName: '김태훈',
    },
    {
      memoId: 9,
      memoTitle: 'JS Promise란 무엇일까?',
      memoText:
        'JS Lorem ipsum adipisicing elit. Molestias laboriosam asperiores, delectus necessitatibus natus, sequi pariatur libero tenetur consequuntur doloribus sit repellendus ipsum.',
      memoColor: 'yellow',
      createdDate: '2023-07-19',
      authorId: '3',
      authorName: '고동우',
    },
    {
      memoId: 10,
      memoTitle: 'JDK란?',
      memoText:
        'JDK이다 Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias laboriosam asperiores, delectus necessitatibus natus, sequi pariatur libero tenetur consequuntur doloribus sit repellendus ipsum magni temporibus placeat hic rem.',
      memoColor: 'green',
      createdDate: '2023-07-19',
      authorId: '1',
      authorName: '정진우',
    },
    {
      memoId: 11,
      memoTitle: 'JPA란?',
      memoText:
        'JPA이다 Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias laboriosam asperiores, delectus necessitatibus natus, sequi pariatur libero tenetur consequuntur doloribus sit repellendus ipsum magni temporibus placeat hic rem.',
      memoColor: 'red',
      createdDate: '2023-07-19',
      authorId: '2',
      authorName: '김태훈',
    },
    {
      memoId: 12,
      memoTitle: 'JS Promise란 무엇일까?',
      memoText:
        'JS Lorem ipsum adipisicing elit. Molestias laboriosam asperiores, delectus necessitatibus natus, sequi pariatur libero tenetur consequuntur doloribus sit repellendus ipsum.',
      memoColor: 'yellow',
      createdDate: '2023-07-19',
      authorId: '3',
      authorName: '고동우',
    },
    {
      memoId: 13,
      memoTitle: 'JDK란?',
      memoText:
        'JDK이다 Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias laboriosam asperiores, delectus necessitatibus natus, sequi pariatur libero tenetur consequuntur doloribus sit repellendus ipsum magni temporibus placeat hic rem.',
      memoColor: 'green',
      createdDate: '2023-07-19',
      authorId: '1',
      authorName: '정진우',
    },
    {
      memoId: 14,
      memoTitle: 'JPA란?',
      memoText:
        'JPA이다 Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias laboriosam asperiores, delectus necessitatibus natus, sequi pariatur libero tenetur consequuntur doloribus sit repellendus ipsum magni temporibus placeat hic rem.',
      memoColor: 'red',
      createdDate: '2023-07-19',
      authorId: '2',
      authorName: '김태훈',
    },
    {
      memoId: 15,
      memoTitle: 'JS Promise란 무엇일까?',
      memoText:
        'JS Lorem ipsum adipisicing elit. Molestias laboriosam asperiores, delectus necessitatibus natus, sequi pariatur libero tenetur consequuntur doloribus sit repellendus ipsum.',
      memoColor: 'yellow',
      createdDate: '2023-07-19',
      authorId: '3',
      authorName: '고동우',
    },
    {
      memoId: 16,
      memoTitle: 'JDK란?',
      memoText:
        'JDK이다 Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias laboriosam asperiores, delectus necessitatibus natus, sequi pariatur libero tenetur consequuntur doloribus sit repellendus ipsum magni temporibus placeat hic rem.',
      memoColor: 'green',
      createdDate: '2023-07-19',
      authorId: '1',
      authorName: '정진우',
    },
    {
      memoId: 17,
      memoTitle: 'JPA란?',
      memoText:
        'JPA이다 Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias laboriosam asperiores, delectus necessitatibus natus, sequi pariatur libero tenetur consequuntur doloribus sit repellendus ipsum magni temporibus placeat hic rem.',
      memoColor: 'red',
      createdDate: '2023-07-19',
      authorId: '2',
      authorName: '김태훈',
    },
    {
      memoId: 18,
      memoTitle: 'JS Promise란 무엇일까?',
      memoText:
        'JS Lorem ipsum adipisicing elit. Molestias laboriosam asperiores, delectus necessitatibus natus, sequi pariatur libero tenetur consequuntur doloribus sit repellendus ipsum.',
      memoColor: 'yellow',
      createdDate: '2023-07-19',
      authorId: '3',
      authorName: '고동우',
    },
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold my-5">Memos</h2>
      <MemosGrid memos={memos} />
    </section>
  );
}
