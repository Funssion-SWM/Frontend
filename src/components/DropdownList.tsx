import Link from 'next/link';

export default function DropdownList() {
  return (
    <nav className="absolute top-10 bg-slate-200">
      <ul>
        <Link href="/me">
          <li>프로필</li>
        </Link>
        <li>로그아웃</li>
      </ul>
    </nav>
  );
}
