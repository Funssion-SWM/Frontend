import Image from 'next/image';
import logo from '@/assets/inforum_logo.png';
import MainDescription from '@/components/landing/MainDescription';

export default function LandingMain() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-t from-soma-blue-30 from-0% via-white via-80%">
      <Image src={logo} width={350} alt="logo" />
      <MainDescription />
    </div>
  );
}
