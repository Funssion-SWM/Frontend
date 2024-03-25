type Props = {
  animationDelay: string;
  fontSize: string;
  colorDepth: number;
};

export default function CherryFlake({
  animationDelay,
  fontSize,
  colorDepth,
}: Props) {
  return (
    <p
      className={`animate-[fall_30s_infinite]  opacity-0 ${
        { 0: 'text-pink-100', 1: 'text-pink-200', 2: 'text-pink-300' }[
          colorDepth
        ]
      }`}
      style={{ animationDelay, fontSize }}
    >
      {'❀'}
    </p>
  );
}
