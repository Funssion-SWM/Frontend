import { Notification } from "@/types/notification";

export async function getNotificationsTop30(
    cookie: string
  ): Promise<Notification[]> {
    return fetch(
      `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/notifications`,
      {
          next: { revalidate: 0 },
          headers: {
            Cookie: `${cookie}`,
          },
        }
    )
      .then((res) => {
        if (!res.ok) throw new Error('notification error 발생!');
        return res.json();
      })
      .catch(console.error);
  }
  
  export async function checkNotifications(): Promise<void> {
    return fetch(
      `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/notifications/check`,
      { method: 'POST', credentials: 'include' }
    ).then((res) => {
      if (!res.ok) throw new Error('notification error 발생!');
    });
  }