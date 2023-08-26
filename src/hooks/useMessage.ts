import { MessageProperty, MessageType } from '@/types';
import { useState } from 'react';

export const useMessage = (): [
  MessageProperty,
  (text: string, type: MessageType) => void
] => {
  const [text, setText] = useState('');
  const [type, setType] = useState<MessageType>('fail');
  const [isVisible, setIsVisible] = useState(false);

  const showMessage = (text: string, type: MessageType) => {
    setText(text);
    setType(type);
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  };

  return [{ text, type, isVisible }, showMessage];
};
