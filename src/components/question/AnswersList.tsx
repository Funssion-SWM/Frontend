import AnswerCard from './AnswerCard';

const answers = [
  {
    answerId: 1,
    answerTitle: 'answer title',
    answerText:
      '{"type": "doc", "content": [{"type": "paragraph", "content": [{"text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio voluptates expedita odit dolores, aspernatur laudantium eaque maxime nesciunt velit quasi officia. Enim libero alias rerum, tenetur quos minima error rem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio voluptates expedita odit dolores, aspernatur laudantium eaque maxime nesciunt velit quasi officia. Enim libero alias rerum, tenetur quos minima error rem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio voluptates expedita odit dolores, aspernatur laudantium eaque maxime nesciunt velit quasi officia. Enim libero alias rerum, tenetur quos minima error rem!", "type": "text"}]}]}',
    createdDate: '2023-09-27',
  },
  {
    answerId: 2,
    answerTitle: 'answer title2',
    answerText:
      '{"type": "doc", "content": [{"type": "paragraph", "content": [{"text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio voluptates expedita odit dolores, aspernatur laudantium eaque maxime nesciunt velit quasi officia. Enim libero alias rerum, tenetur quos minima error rem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio voluptates expedita odit dolores, aspernatur laudantium eaque maxime nesciunt velit quasi officia. Enim libero alias rerum, tenetur quos minima error rem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio voluptates expedita odit dolores, aspernatur laudantium eaque maxime nesciunt velit quasi officia. Enim libero alias rerum, tenetur quos minima error rem!", "type": "text"}]}]}',
    createdDate: '2023-09-27',
  },
  {
    answerId: 3,
    answerTitle: 'answer title3',
    answerText:
      '{"type": "doc", "content": [{"type": "paragraph", "content": [{"text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio voluptates expedita odit dolores, aspernatur laudantium eaque maxime nesciunt velit quasi officia. Enim libero alias rerum, tenetur quos minima error rem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio voluptates expedita odit dolores, aspernatur laudantium eaque maxime nesciunt velit quasi officia. Enim libero alias rerum, tenetur quos minima error rem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio voluptates expedita odit dolores, aspernatur laudantium eaque maxime nesciunt velit quasi officia. Enim libero alias rerum, tenetur quos minima error rem!", "type": "text"}]}]}',
    createdDate: '2023-09-27',
  },
];

export default function AnswersList() {
  return (
    <ul className="flex flex-col gap-2">
      {answers.map((answer) => (
        <li key={answer.answerId}>
          <AnswerCard answer={answer} />
        </li>
      ))}
    </ul>
  );
}
