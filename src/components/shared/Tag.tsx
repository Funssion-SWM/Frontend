type Props = {
  tagText: string;
  onClick: () => void;
};

export default function Tag({ tagText, onClick }: Props) {
  return (
    <div
      className="cursor-pointer py-1 px-3 rounded-2xl bg-soma-grey-25 text-soma-blue-50 text-sm sm:text-base"
      onClick={onClick}
    >
      {tagText}
    </div>
  );
}
