'use client';

import SelectColorBar from '@/components/create/memo/SelectColorBar';
import MyEditor from '@/components/editor';
import { useEditor } from '@tiptap/react';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react';
import BlueBtn from '../../shared/btn/BlueBtn';
import { createOrUpdateMemo } from '@/service/memos';
import { getPrevText } from '@/lib/editor';
import { useCompletion } from 'ai/react';
import { getDescription } from '@/service/description';
import { ModalContext } from '@/context/ModalProvider';
import { TiptapExtensions } from '@/components/editor/extensions';
import { TiptapEditorProps } from '@/components/editor/props';
import { MemoColor } from '@/types/memo';

type Props = {
  preTitle?: string;
  preContent?: string;
  preColor?: MemoColor;
  alreadyExists: boolean;
  memoId?: number;
};

export default function EditorForm({
  preTitle = '',
  preContent,
  preColor = 'yellow',
  alreadyExists,
  memoId,
}: Props) {
  const router = useRouter();
  const { open } = useContext(ModalContext);
  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    content: preContent,
    onUpdate: (e) => {
      // setSaveStatus('Unsaved');
      const selection = e.editor.state.selection;
      const lastTwo = getPrevText(e.editor, {
        chars: 2,
      });
      if (lastTwo === '++' && !isLoading) {
        e.editor.commands.deleteRange({
          from: selection.from - 2,
          to: selection.from,
        });
        complete(
          getPrevText(e.editor, {
            chars: 5000,
          })
        );
        // complete(e.editor.storage.markdown.getMarkdown());
        // va.track('Autocomplete Shortcut Used');
      } else {
        // debouncedUpdates(e);
      }
    },
  });

  const { complete, completion, isLoading, stop } = useCompletion({
    id: 'novel',
    api: '/api/generate',
    onFinish: (_prompt, completion) => {
      editor?.commands.setTextSelection({
        from: editor.state.selection.from - completion.length,
        to: editor.state.selection.from,
      });
    },
    onError: (err) => {
      // toast.error(err.message);
      // if (err.message === 'You have reached your request limit for the day.') {
      //   va.track('Rate Limit Reached');
      // }
    },
  });

  const prev = useRef('');

  // Insert chunks of the generated text
  useEffect(() => {
    const diff = completion.slice(prev.current.length);
    prev.current = completion;
    editor?.commands.insertContent(diff);
  }, [isLoading, editor, completion]);

  useEffect(() => {
    // if user presses escape or cmd + z and it's loading,
    // stop the request, delete the completion, and insert back the "++"
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || (e.metaKey && e.key === 'z')) {
        stop();
        if (e.key === 'Escape') {
          editor?.commands.deleteRange({
            from: editor.state.selection.from - completion.length,
            to: editor.state.selection.from,
          });
        }
        editor?.commands.insertContent('++');
      }
    };
    const mousedownHandler = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      stop();
      if (window.confirm('AI writing paused. Continue?')) {
        complete(editor?.getText() || '');
      }
    };
    if (isLoading) {
      document.addEventListener('keydown', onKeyDown);
      window.addEventListener('mousedown', mousedownHandler);
    } else {
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('mousedown', mousedownHandler);
    }
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('mousedown', mousedownHandler);
    };
  }, [stop, isLoading, editor, complete, completion.length]);

  const [title, setTitle] = useState(preTitle);
  const [selectedColor, setSelectedColor] = useState<MemoColor>(preColor);
  const handleBtnClick = () => {
    if (title === '') {
      alert('제목을 작성해주세요!');
      return;
    }

    if (title.length > 75) {
      alert('제목 수 제한 75자를 초과하였습니다!');
      return;
    }

    const memoText = JSON.stringify(editor?.getJSON());

    if (!memoText.includes('text')) {
      alert('내용을 작성해주세요!');
      return;
    }

    const memoDescription = getDescription(memoText);
    createOrUpdateMemo(
      `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/memos${
        !alreadyExists ? `/${memoId}` : ''
      }`,
      {
        memoTitle: title,
        memoDescription,
        memoText,
        memoColor: selectedColor,
      }
    ).then(() => {
      if (alreadyExists) router.push('/memos');
      else router.push(`/memos/${memoId}`);
      router.refresh();
    });
  };

  const handleColorClick = (color: MemoColor) => setSelectedColor(color);

  return (
    <section
      className={`relative flex flex-col rounded-lg shadow-lg px-4 py-2 min-h-screen sm:min-h-[calc(100vh-100px)]  ${
        {
          yellow: 'bg-memo-yellow',
          green: 'bg-memo-green',
          skyblue: 'bg-memo-skyblue',
          orange: 'bg-memo-orange',
          pink: 'bg-memo-pink',
          navy: 'bg-memo-navy',
          purple: 'bg-memo-purple',
        }[selectedColor]
      }`}
    >
      <BlueBtn
        text={alreadyExists ? '등록' : '수정'}
        onClick={handleBtnClick}
        extraStyle="self-end"
      />
      <input
        type="text"
        placeholder="제목을 입력해주세요."
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full outline-none text-2xl sm:text-4xl px-4 py-3 bg-transparent font-bold mt-2 border-t-2 border-gray-400"
        autoFocus
      />
      {/* <h3>tag</h3> */}
      <SelectColorBar selected={selectedColor} onClick={handleColorClick} />
      <MyEditor editor={editor} />
      <button
        className="absolute bottom-3 right-5 text-soma-grey-50"
        onClick={() =>
          open('나가시겠습니까?', () => {
            router.back();
          })
        }
      >
        나가기
      </button>
    </section>
  );
}
