export type MessageType = 'success' | 'fail';

export type MessageProperty = {
  text: string;
  type: MessageType;
  isVisible: boolean;
};
