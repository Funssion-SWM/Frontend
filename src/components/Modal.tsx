'use client';

import { ModalContext } from '@/context/ModalProvider';
import { useContext } from 'react';
import BlueBtn from './shared/BlueBtn';
import BlueBtn2 from './shared/BlueBtn2';

export default function Modal() {
  const { isOpen, close, onSuccess, modalText } = useContext(ModalContext);

  return (
    isOpen && (
      <div className="fixed">
        <Overay onClick={() => close()} />
        <div
          className="fixed flex flex-col items-center bg-white rounded-2xl p-10 
      top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-2 "
        >
          <p className="text-lg">{modalText}</p>
          <div className="flex gap-2">
            <BlueBtn
              text="확인"
              onClick={() => {
                close();
                onSuccess();
              }}
            />
            <BlueBtn2 text="취소" onClick={() => close()} />
          </div>
        </div>
      </div>
    )
  );
}

function Overay({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="w-screen h-screen bg-white opacity-50"
      onClick={onClick}
    ></div>
  );
}
