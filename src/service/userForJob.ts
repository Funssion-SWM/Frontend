import { ErrorResponse } from '@/types';
import { DevelopmentArea } from '@/types/coverletter';
import { UserForJobInfo } from '@/types/userForJob';

export async function getUserForJobInfos(
  developmentArea: DevelopmentArea | null,
  techStacks: string[]
): Promise<UserForJobInfo[] | ErrorResponse> {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/users/profile`
  );
  const techStackDto = {
    developmentArea,
    techStacks,
  };
  // const params = {
  //   techStackDto: techStackDto.toString(),
  // };
  // url.search = new URLSearchParams(params).toString();
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 0 },
    credentials: 'include',
    body: JSON.stringify(techStackDto),
  })
    .then((res) => {
      // if (res.status === 500) throw new Error('getUserForJobInfos 500에러');
      return res.json();
    })
    .catch(console.error);
}
