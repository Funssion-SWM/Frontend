import { ErrorResponse } from '@/types';
import { CoverletterInfo, SetCoverletterRequest } from '@/types/coverletter';
import { PostImageResponse } from '@/types/image';

export async function getCoverletterInfoByUserId(
  userId: number,
  cookie?: string
): Promise<CoverletterInfo | ErrorResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/users/profile/professional/${userId}`,
    cookie
      ? {
          next: { revalidate: 0 },
          headers: {
            Cookie: `${cookie}`,
          },
        }
      : {
          next: { revalidate: 0 },
          credentials: 'include',
        }
  )
    .then((res) => res.json())
    .catch(console.error);
}

export async function createCoverletter(
  coverletterInfo: SetCoverletterRequest
): Promise<void | ErrorResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/users/profile/professional`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(coverletterInfo),
    }
  )
    .then((res) => res.json())
    .catch(console.error);
}

export async function updateCoverletter(
  coverletterInfo: SetCoverletterRequest
): Promise<void | ErrorResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/users/profile/professional`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(coverletterInfo),
    }
  )
    .then((res) => res.json())
    .catch(console.error);
}

export async function setCoverletterVisibleMode(
  isVisible: boolean
): Promise<void | ErrorResponse> {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/users/profile/professional/visibility`
  );

  const params = { isVisible: isVisible.toString() };
  url.search = new URLSearchParams(params).toString();

  return fetch(url, {
    method: 'POST',
    credentials: 'include',
  })
    .then((res) => res.json())
    .catch(console.error);
}

export async function getCoverletterVisibleMode(cookie?: string) {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/users/profile/professional/visibility`,
    cookie
      ? {
          next: { revalidate: 0 },
          headers: {
            Cookie: `${cookie}`,
          },
        }
      : {
          next: { revalidate: 0 },
          credentials: 'include',
        }
  )
    .then((res) => res.json())
    .catch(console.error);
}

export async function postImageInCoverletter(
  image: File
): Promise<PostImageResponse | ErrorResponse> {
  const formdata = new FormData();
  formdata.append('image', image);
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/users/profile/professional/resume/image`,
    {
      method: 'POST',
      body: formdata,
      credentials: 'include',
    }
  )
    .then((res) => {
      if (res.status === 413) {
        return { code: 413, message: '이미지 크기가 10MB를 초과하였습니다.' };
      }
      return res.json();
    })
    .catch(console.error);
}
