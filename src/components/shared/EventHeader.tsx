export default function EventHeader() {
  return (
    <header className={`fixed top-0 bg-white z-10 w-full`}>
      <div className="flex justify-center relative items-center py-4 px-1 sm:px-5 m-auto h-[70px] font-medium text-xl">
        <p>
          🎉
          <span className="font-bold text-green-400 mx-[6px]">네이버페이</span>
          3000원 이벤트 진행중 - 개발 메모 작성하고 설문조사하면 3000원 무조건
          지급!{` `}🎉
        </p>
      </div>
    </header>
  );
}
