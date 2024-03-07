import { Bell, DefaultProfile } from '@/assets/svg';
import { useDetectOutsideClick } from '@/hooks/useDeleteOutsideClick';
import { checkNotifications } from '@/service/notification';
import { Notification } from '@/types/notification';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import RelativeDate from '../RelativeDate';
import { checkUser } from '@/service/auth';

type Props = {
  notifications: Notification[];
};

export default function NotificationBox({ notifications }: Props) {
  const notificationRef = useRef<HTMLElement>(null);
  const [isChecked, setIsChecked] = useState<Boolean | null>(null);

  const [isNotificationActive, setIsNotificationActive] = useDetectOutsideClick(
    notificationRef,
    false
  );

  const handleClick = () => {
    setIsNotificationActive((pre) => !pre);
    if (!isChecked) {
      setIsChecked(true);
      checkNotifications();
    }
  };
  const router = useRouter();

  return (
    <nav className="relative flex items-center" ref={notificationRef}>
      <button onClick={handleClick} className="relative">
        <Image className="cursor-pointer" src={Bell} alt="bellIcon" />
        <div
          className={`${
            isChecked === null || isChecked ? 'invisible' : 'visible'
          } p-[5px] -top-0.5 -right-0.5 absolute bg-red-400 rounded-full`}
        />
      </button>
      <ul
        className={`absolute top-8 max-h-[300px] overflow-auto scroll-p-0 min-w-[300px] bg-white rounded-xl shadow-xl -translate-x-1/2 scroll-remove  ${
          isNotificationActive ? 'visible' : 'hidden'
        }`}
      >
        <div className="px-4 py-2 bg-gray-100 rounded-t-xl">알림</div>
        {notifications?.map((notification) => {
          if (!notification.isChecked && isChecked === null)
            setIsChecked(false);
          return (
            <li key={notification.id.toString()}>
              <div className="flex justify-between px-2 py-1 text-xs border-t border-gray-300">
                <button
                  className="inline-flex items-center gap-2 cursor-pointer hover:text-soma-blue-40"
                  onClick={() => router.push('me/' + notification.senderId)}
                >
                  <span className="inline-flex items-center">
                    <Image
                      className="inline-block object-cover rounded-full cursor-pointer w-7 h-7"
                      src={notification.senderImagePath ?? DefaultProfile}
                      alt={notification.senderName}
                      width={28}
                      height={28}
                    />
                  </span>
                  {notification.senderName}
                </button>

                <span className="inline-flex items-center">
                  <RelativeDate date={notification.created} type="YMD" />
                </span>
              </div>
              <button
                onClick={() => {
                  switch (notification.notificationType) {
                    case 'NEW_INTERVIEW':
                      checkUser().then((data) => {
                        router.push(
                          `/mini-interview?employerId=${notification.senderId}&employeeId=${data.id}`
                        );
                      });
                      break;
                    case 'NEW_FOLLOWER':
                    case 'NEW_EMPLOYER':
                      router.push('/me/' + notification.senderId);
                      break;
                    case 'NEW_INTERVIEW_COMPLETE':
                      router.push(
                        `/me/employer/id?intervieweeId=${notification.senderId}`
                      );
                      break;
                    default:
                      router.push(
                        '/' +
                          notification.postTypeToShow.toLocaleLowerCase() +
                          's/' +
                          notification.postIdToShow
                      );
                  }
                }}
                className="flex items-center justify-between px-3 pb-2 text-sm"
              >
                <span className="cursor-pointer hover:text-soma-blue-40">
                  {notification.message}
                </span>
                {notification.isChecked ? (
                  <></>
                ) : (
                  <span className="inline-block w-2 h-2 bg-red-400 rounded-full" />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
