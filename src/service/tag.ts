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
