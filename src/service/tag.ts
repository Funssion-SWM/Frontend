export async function getDefaultTags(): Promise<string[]> {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/tags`, {
    method: 'GET',
  })
    .then((res) => {
      if (!res.ok) throw new Error('error 발생!');
      return res.json();
    })
    .catch(console.error);
}

export async function getUserTags(
  userId: string,
  cnt?: number
): Promise<string[]> {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/tags/${userId}`
  );

  if (cnt) {
    const params = { tagCnt: cnt?.toString() };
    url.search = new URLSearchParams(params).toString();
  }

  return fetch(url, {
    next: { revalidate: 0 },
  })
    .then((res) => {
      if (!res.ok) throw new Error('error 발생!');
      return res.json();
    })
    .catch(console.error);
}
