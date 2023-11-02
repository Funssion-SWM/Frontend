type Props = {
  next: () => void;
};

export default function MiniInterviewReadyContainer({ next }: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      <div className="text-3xl sm:text-5xl font-bold">인프랩 - 미니 인터뷰</div>
      <div className="text-center sm:text-lg">
        <p>질문은 총 3개가 주어집니다.</p>
        <p>질문 하나 당 60초 내에 답변을 작성해주셔야 합니다.</p>
        <p>준비가 되면 시작하기 버튼을 눌러주세요</p>
      </div>
      <button
        className="bg-soma-blue-40 text-white px-4 py-2 text-xl sm:text-2xl rounded-2xl hover:brightness-90 transition-all"
        onClick={() => next()}
      >
        시작하기
      </button>
    </div>
  );
}
