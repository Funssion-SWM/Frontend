import { ErrorResponse } from '@/types';
import { CoverletterInfo } from '@/types/coverletter';

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
  coverletterInfo: CoverletterInfo
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
  coverletterInfo: CoverletterInfo
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
