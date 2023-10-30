import { ErrorResponse } from '@/types';
import { DevelopmentArea } from '@/types/coverletter';
import { UserForJobInfo } from '@/types/userForJob';

export async function getUserForJobInfos(
  developmentArea: DevelopmentArea | null,
  techStack: string[]
): Promise<UserForJobInfo[] | ErrorResponse> {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/users/profile`
  );
  const params = {
    developmentArea: developmentArea ?? '',
    techStack: techStack.toString(),
  };
  url.search = new URLSearchParams(params).toString();
  return fetch(url, { next: { revalidate: 0 } })
    .then((res) => {
      if (res.status === 500) throw new Error('getUserForJobInfos 500에러');
      return res.json();
    })
    .catch(console.error);
}
