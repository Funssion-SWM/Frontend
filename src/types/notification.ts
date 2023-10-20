export type Notification = {
  id: number;
  senderId: number;
  senderName: string;
  senderImagePath: string;
  message: string;
  isChecked: boolean;
  created: string;
  postTypeToShow?: string;
  postIdToShow?: number;
}