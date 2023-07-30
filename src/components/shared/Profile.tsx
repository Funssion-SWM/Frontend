import Image from 'next/image';
import exampleImg from '../../public/img/profile.png';

type Props = {
  userInfo: {
    userName: string;
  };
};

export default function Profile({ userInfo }: Props) {
  return (
    <section className="flex flex-col items-center">
      <div className="text-center">
        <Image
          src={exampleImg}
          alt="exampleImg"
          height={130}
          className="rounded-full"
        />
        <p className="font-bold mt-1">{userInfo.userName}</p>
        {/* <p>15301</p> */}
      </div>

      {/* <div className="self-start mt-5">
        <h3 className="font-semibold">자기소개</h3>
        <p className="bg-gray-200 p-3 rounded-md mt-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
          explicabo deserunt at minima! Eligendi impedit culpa, natus vero
          repudiandae suscipit voluptatem at nobis iste quibusdam tempore labore
          rerum nemo accusantium!
        </p>
      </div> */}
    </section>
  );
}
