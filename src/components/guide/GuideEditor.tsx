'use client';

import SelectColorBar from '@/components/create/memo/SelectColorBar';
import MyEditor from '@/components/editor';
import { useEditor } from '@tiptap/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import BlueBtn from '../shared/btn/BlueBtn';
import { createOrUpdateMemo, getMemoById } from '@/service/memos';
import { getPrevText } from '@/lib/editor';
import { useCompletion } from 'ai/react';
import { getDescription } from '@/service/description';
import { handleTiptapExtensions } from '@/components/editor/extensions';
import { handleTiptapEditorProps } from '@/components/editor/props';
import { MemoColor } from '@/types/memo';
import FakeEditor from '@/components/editor/components/FakeEditor';
import { notifyToast } from '@/service/notify';
import { RingLoader } from 'react-spinners';
import GuideCreateMemoModal from './GuideCreateMemoModal';

export default function GuideEditor() {
  const router = useRouter();

  const isFromDraftModal = useSearchParams()?.get('temp');

  const generateAI = useCompletion({
    id: 'inforum',
    api: '/api/generate',
    onFinish: (_prompt, completion) => {
      fakeEditor?.commands.clearContent();
      editor?.commands.insertContent(completion, {
        parseOptions: {
          preserveWhitespace: false,
        },
      });
      editor?.commands.setTextSelection({
        from: editor.state.selection.from - completion.length,
        to: editor.state.selection.from,
      });
    },
    onError: (err) => {
      notifyToast(err.message, 'error');
    },
  });

  const descriptionAI = useCompletion({
    id: 'inforum2',
    api: '/api/generate/description',
    onError: (err) => {
      notifyToast(err.message, 'error');
    },
  });

  const tagsAI = useCompletion({
    id: 'inforum3',
    api: '/api/generate/tags',
    onError: (err) => {
      notifyToast(err.message, 'error');
    },
  });

  const [title, setTitle] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<MemoColor>('yellow');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const editor = useEditor({
    extensions: handleTiptapExtensions('guide', 0),
    editorProps: handleTiptapEditorProps('guide', 0),
    autofocus: 'end',
    onUpdate: (e) => {
      const selection = e.editor.state.selection;
      const lastTwo = getPrevText(e.editor, {
        chars: 2,
      });
      if (lastTwo === '++' && !generateAI.isLoading) {
        e.editor.commands.deleteRange({
          from: selection.from - 2,
          to: selection.from,
        });
        generateAI.complete(
          getPrevText(e.editor, {
            chars: 5000,
          })
        );
      }
    },
  });

  const fakeEditor = useEditor({
    extensions: handleTiptapExtensions('guide', 0),
    editorProps: handleTiptapEditorProps('guide', 0),
    editable: false,
  });

  useEffect(() => {
    fakeEditor?.commands.setContent(generateAI.completion);
  }, [generateAI.isLoading, fakeEditor, generateAI.completion]);

  useEffect(() => {
    // if user presses escape or cmd + z and it's loading,
    // stop the request, delete the completion, and insert back the "++"
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || (e.metaKey && e.key === 'z')) {
        generateAI.stop();
        if (e.key === 'Escape') {
          editor?.commands.deleteRange({
            from: editor.state.selection.from - generateAI.completion.length,
            to: editor.state.selection.from,
          });
        }
        editor?.commands.insertContent('++');
      }
    };
    const mousedownHandler = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      generateAI.stop();
      if (window.confirm('AI writing paused. Continue?')) {
        generateAI.complete(editor?.getText() || '');
      }
    };
    if (generateAI.isLoading) {
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
  }, [
    generateAI.stop,
    generateAI.isLoading,
    editor,
    generateAI.complete,
    generateAI.completion.length,
  ]);

  const edirotRef = useRef<HTMLDivElement>(null);
  const [preScrollHeight, setPreScrollHeight] = useState<number>(0);
  useEffect(() => {
    if (edirotRef.current && document.scrollingElement) {
      if (preScrollHeight < edirotRef.current.scrollHeight) {
        document.scrollingElement.scrollTop +=
          edirotRef.current.scrollHeight - preScrollHeight;
      } else if (preScrollHeight > edirotRef.current.scrollHeight) {
        document.scrollingElement.scrollTop +=
          preScrollHeight - edirotRef.current.scrollHeight;
      }
      setPreScrollHeight(edirotRef.current.scrollHeight);
    }
  }, [editor?.state.selection, preScrollHeight]);

  const handleDescriptionAndTagsAI = async () => {
    if (title === '') {
      notifyToast('제목을 작성해주세요!', 'warning');
      return;
    }

    if (title.length > 120) {
      notifyToast('제목 수 제한 120자를 초과하였습니다!', 'warning');
      return;
    }

    const memoText = JSON.stringify(editor?.getJSON());

    if (!memoText.includes('text')) {
      notifyToast('내용을 작성해주세요!', 'warning');
      return;
    }

    const textForPrompt = `title : ${title}, contents : ${getDescription(
      memoText
    )}`;

    await descriptionAI.complete(textForPrompt);
    await tagsAI.complete(textForPrompt);

    editor?.setOptions({ editable: false });
    setIsModalOpen(true);
  };

  return (
    <div className="flex w-full" ref={edirotRef}>
      <div
        className={`relative flex flex-col rounded-lg shadow-lg px-2 pt-2 pb-4 min-h-screen sm:min-h-for-fit-screen w-full ${
          {
            white: 'bg-soma-white',
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
        <div className="flex justify-end gap-2 mr-1 my-1">
          <BlueBtn
            text="메인 페이지로 이동하기"
            onClick={() => router.push('/series')}
          />
          <BlueBtn text="요약하기" onClick={handleDescriptionAndTagsAI} />
        </div>
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full outline-none text-2xl sm:text-4xl px-4 py-3 bg-transparent font-bold mt-2 border-t-[0.5px] border-soma-grey-49"
          autoFocus={true}
        />
        <SelectColorBar
          selected={selectedColor}
          onClick={(color: MemoColor) => setSelectedColor(color)}
        />
        <MyEditor editor={editor} />
      </div>
      {generateAI.isLoading && <FakeEditor editor={fakeEditor} />}
      {(descriptionAI.isLoading || tagsAI.isLoading) && (
        <div className="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center bg-white opacity-90">
          <RingLoader className="self-center" color="#4992FF" />
          <div className="text-center font-medium text-soma-grey-60 text-sm my-5">
            AI가 description, tags를 자동생성중입니다...
          </div>
        </div>
      )}
      {isModalOpen && (
        <GuideCreateMemoModal
          onClose={() => {
            setIsModalOpen(false);
            editor?.setOptions({ editable: true });
          }}
          onCreateBtnClick={() => router.push('/login')}
          description={descriptionAI.completion}
          tags={tagsAI.completion}
        />
      )}
    </div>
  );
}
