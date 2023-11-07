type NotificationType = 'NEW_COMMENT' | 'NEW_ANSWER' | 
'NEW_QUESTION' | 'NEW_FOLLOWER' | 'NEW_POST_FOLLOWED' | 'NEW_ACCEPTED' |
'NEW_EMPLOYER' | 'NEW_INTERVIEW' | 'NEW_INTERVIEW_COMPLETE' | 'NEW_POST_LIKED_EMPLOYEE';

export type Notification = {
  id: number;
  notificationType: NotificationType;
  senderId: number;
  senderName: string;
  senderImagePath: string;
  message: string;
  isChecked: boolean;
  created: string;
  postTypeToShow: string;
  postIdToShow?: number;
}