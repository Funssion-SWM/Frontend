type Props = {
  tags: string[];
};

export default function TagsList({ tags }: Props) {
  return (
    <div className="flex items-center gap-1 flex-1 w-full overflow-x-hidden">
      {tags.map((item, idx) => (
        <div
          className="font-semibold bg-soma-grey-10 text-soma-blue-40 rounded-3xl py-1 px-2 whitespace-nowrap"
          key={idx}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
