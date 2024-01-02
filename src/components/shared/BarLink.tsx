import Link from 'next/link';

type Props = {
  text: string;
  isSelected: boolean;
  href: string;
};

export default function BarLink({ text, isSelected, href }: Props) {
  return (
    <Link
      href={href}
      className={`flex-1 font-semibold py-1 transition-all text-center ${
        isSelected
          ? 'text-soma-blue-50 border-b-[2px] border-soma-blue-50 '
          : 'text-soma-grey-50 hover:text-soma-blue-50 transition'
      }`}
    >
      {text}
    </Link>
  );
}
