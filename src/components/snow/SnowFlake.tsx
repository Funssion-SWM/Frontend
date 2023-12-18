type Props = {
  animationDelay: string;
  fontSize: string;
  colorDepth: number;
};

export default function SnowFlake({
  animationDelay,
  fontSize,
  colorDepth,
}: Props) {
  return (
    <p
      className={`animate-[fall_30s_infinite]  opacity-0 ${
        { 0: 'text-blue-100', 1: 'text-blue-200', 2: 'text-blue-300' }[
          colorDepth
        ]
      }`}
      style={{ animationDelay, fontSize }}
    >
      {'\u2745'}
    </p>
  );
}
