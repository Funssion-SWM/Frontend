import { Employee } from '@/types/employer';

export async function getEmployees(
  isDone: boolean,
  cookie?: string | undefined
): Promise<Employee[]> {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/employer/employees`
  );
  const params = {
    done: isDone.toString(),
  };
  url.search = new URLSearchParams(params).toString();

  return fetch(
    url,
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

export async function getLikedEmployees(
  cookie?: string | undefined
): Promise<Employee[]> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/employer/like/employees`,
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

export async function getInterviewResultByEmployeeId(
  employeeId: number,
  cookie?: string | undefined
): Promise<Employee[]> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/employer/interview-result/${employeeId}`,
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
