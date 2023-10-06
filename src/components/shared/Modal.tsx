'use client';

import { ModalContext } from '@/context/ModalProvider';
import { useContext } from 'react';
import BlueBtn from '@/components/shared/btn/BlueBtn';
import WhiteBtn from '@/components/shared/btn/WhiteBtn';

export default function Modal() {
  const { isOpen, close, onSuccess, modalText } = useContext(ModalContext);

  return (
    isOpen && (
      <div className="absolute top-0">
        <Overay onClick={() => close()} onKeyDown={(e)=> {
            if (e.key == 'Enter') {
              close();
              onSuccess();
            }
        }} />
        <div
          className="fixed flex flex-col shadow-lg items-center bg-white rounded-2xl p-5 sm:p-10 
      top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-2 "
        >
          <p className="sm:text-lg">{modalText}</p>
          <div className="flex gap-2">
            <BlueBtn
              text="확인"
              onClick={() => {
                close();
                onSuccess();
              }}
            />
            <WhiteBtn text="취소" onClick={() => close()} />
          </div>
        </div>
      </div>
    )
  );
}

function Overay({ onClick, onKeyDown }: { onClick: () => void, onKeyDown: (e: React.KeyboardEvent) => void }) {
  return (
    <div
      className="w-screen h-screen bg-white opacity-50"
      onClick={onClick}
    >
      <input 
        type='text'
        onKeyDown={onKeyDown}
        className='opacity-0'
        autoFocus
      />  
    </div>
  );
}
