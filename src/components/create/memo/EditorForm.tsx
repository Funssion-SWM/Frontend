'use client';

import SelectColorBar from '@/components/create/memo/SelectColorBar';
import MyEditor from '@/components/editor';
import { useEditor } from '@tiptap/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react';
import BlueBtn from '../../shared/btn/BlueBtn';
import {
  createOrUpdateMemo,
  getMemoById,
  getMemoDrafts,
} from '@/service/memos';
import { getPrevText } from '@/lib/editor';
import { useCompletion } from 'ai/react';
import { getDescription } from '@/service/description';
import { ModalContext } from '@/context/ModalProvider';
import { handleTiptapExtensions } from '@/components/editor/extensions';
import { handleTiptapEditorProps } from '@/components/editor/props';
import { Memo, MemoColor } from '@/types/memo';
import WhiteBtnWithCount from '@/components/shared/btn/WhiteBtnWithCount';
import FakeEditor from '@/components/editor/components/FakeEditor';
import { useDebounce } from '@/hooks/useDebounce';
import { DraftsInModalContext } from '@/context/DraftsInModalProvider';
import { TEMPORARY_SAVE_INTERVAL_TIME } from '@/utils/const';
import { notifyToast } from '@/service/notify';
import CreateMemoModal from './CreateMemoModal';
import { RingLoader } from 'react-spinners';

type Props = {
  userId: number;
};

export default function EditorForm({ userId }: Props) {
  const router = useRouter();
  const { open } = useContext(ModalContext);
  const { openDrafts } = useContext(DraftsInModalContext);

  const memoId = Number(useSearchParams()?.get('id'));
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
  const [contents, setContents] = useState('');
  const [isMemoLoading, setIsMemoLoading] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const temporarySaveCallbackForSavingImage = async () => {
    return createOrUpdateMemo(
      `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/memos`,
      {
        memoTitle: 'temp',
        memoDescription: 'temp',
        memoText:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"temp"}]}]}',
        memoColor: selectedColor,
        memoTags: [],
        isTemporary: true,
      }
    ).then((data) => data.memoId);
  };

  const routingAfterUploadImage = (memoId: number) => {
    router.push(`/create/memo?id=${memoId}`);
  };

  const isInitialMount = useRef(true);
  // memoId가 변경되면 실행 for 이미지 임시저장
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (memoId) {
        if (isFromDraftModal === 'true') {
          getMemoById(memoId).then((data) => {
            setTitle(data.memoTitle);
            setSelectedColor(data.memoColor);
            // setTags(data.memoTags);
            editor?.commands.setContent(JSON.parse(data.memoText));
          });
          return;
        }
        const memoDescription = getDescription(contents);
        createOrUpdateMemo(
          `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/memos/${memoId}`,
          {
            memoTitle: title || 'temp',
            memoDescription: memoDescription || 'temp',
            memoText: contents,
            memoColor: selectedColor,
            memoTags: [],
            isTemporary: true,
          }
        );
      }
    }
  }, [memoId]);

  const editor = useEditor({
    extensions: handleTiptapExtensions(
      'memo',
      memoId,
      temporarySaveCallbackForSavingImage,
      (memoId: number) => routingAfterUploadImage(memoId)
    ),
    editorProps: handleTiptapEditorProps(
      'memo',
      memoId,
      temporarySaveCallbackForSavingImage,
      (memoId: number) => routingAfterUploadImage(memoId)
    ),
    autofocus: memoId ? 'end' : false,
    onCreate: async (e) => {
      if (memoId)
        await getMemoById(memoId).then(
          ({ memoTitle, memoColor, memoTags, memoText, isCreated }) => {
            setTitle(memoTitle);
            setSelectedColor(memoColor);
            // setTags(memoTags);
            e.editor.commands.setContent(JSON.parse(memoText));
            setIsCreated(isCreated);
          }
        );
      setIsMemoLoading(true);
    },
    onUpdate: (e) => {
      setContents(JSON.stringify(e.editor.getJSON()));
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
    extensions: handleTiptapExtensions('memo', memoId),
    editorProps: handleTiptapEditorProps('memo', memoId),
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

  const temporaryContents = useDebounce(contents, TEMPORARY_SAVE_INTERVAL_TIME);

  // 자동 임시 저장
  useEffect(() => {
    if (
      !title ||
      !temporaryContents ||
      !contents ||
      generateAI.isLoading ||
      isCreated
    )
      return;

    const memoDescription = getDescription(contents);
    createOrUpdateMemo(
      `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/memos${
        memoId ? `/${memoId}` : ''
      }`,
      {
        memoTitle: title,
        memoDescription,
        memoText: temporaryContents,
        memoColor: selectedColor,
        memoTags: [],
        isTemporary: true,
      }
    ).then((data) => {
      if (data.code) {
        notifyToast('임시 저장에 실패했습니다.', 'error');
        return;
      }
      notifyToast('임시 저장되었습니다.', 'success');
      !memoId && router.push(`/create/memo?id=${data.memoId}`);
    });
  }, [temporaryContents]);

  const [drafts, setDrafts] = useState<Memo[]>([]);

  const first = async () => {
    getMemoDrafts().then((data) => setDrafts(data));
  };

  useEffect(() => {
    first();
  }, []);

  const savePost = (
    saveMode: 'permanent' | 'temporary',
    description?: string,
    seriesId?: number | null,
    seriesTitle?: string | null,
    tags?: string[]
  ) => {
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

    const memoDescription =
      saveMode === 'permanent'
        ? description || getDescription(memoText)
        : getDescription(memoText);

    createOrUpdateMemo(
      `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/memos${
        memoId ? `/${memoId}` : ''
      }`,
      {
        memoTitle: title,
        memoDescription,
        memoText,
        memoColor: selectedColor,
        memoTags: tags ?? [],
        isTemporary: saveMode === 'temporary',
        seriesId: seriesId || null,
        seriesTitle: seriesTitle,
      }
    ).then((data) => {
      if (data.code) {
        notifyToast(data.message, 'error');
        return;
      }

      if (saveMode === 'temporary') {
        notifyToast('임시 저장되었습니다.', 'success');
        !memoId && router.push(`/create/memo?id=${data.memoId}`);
      } else {
        notifyToast('성공적으로 등록되었습니다.', 'success');
        memoId ? router.push(`/memos/${memoId}`) : router.push('/memos');
      }
      router.refresh();
    });
  };

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

  const handleCreate = (
    description: string,
    seriesId: number | null,
    seriesTitle: string | null,
    tags: string[]
  ) => {
    savePost('permanent', description, seriesId, seriesTitle, tags);
  };

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

    const text = JSON.stringify(editor?.getJSON());
    await descriptionAI.complete(text);
    await tagsAI.complete(text);
    editor?.setOptions({ editable: false });
    setIsModalOpen(true);
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      return (e.returnValue = '');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  });

  return (
    isMemoLoading && (
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
            {!isCreated && (
              <WhiteBtnWithCount
                text="임시저장"
                count={drafts.length}
                onClickBtn={() => savePost('temporary')}
                onClickCount={() => openDrafts(drafts)}
              />
            )}
            <BlueBtn text="등록" onClick={handleDescriptionAndTagsAI} />
          </div>
          <input
            type="text"
            placeholder="제목을 입력해주세요."
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full outline-none text-2xl sm:text-4xl px-4 py-3 bg-transparent font-bold mt-2 border-t-[0.5px] border-soma-grey-49"
            autoFocus={memoId ? false : true}
          />
          <SelectColorBar
            selected={selectedColor}
            onClick={(color: MemoColor) => setSelectedColor(color)}
          />
          <MyEditor editor={editor} />
          <button
            className="absolute bottom-3 right-5 text-soma-grey-50"
            onClick={() =>
              open('나가시겠습니까?', () => {
                router.push(`/memos`);
              })
            }
          >
            나가기
          </button>
        </div>
        {generateAI.isLoading && <FakeEditor editor={fakeEditor} />}
        {(descriptionAI.isLoading || tagsAI.isLoading) && (
          <div className="absolute f top-0 left-0 w-screen h-screen flex flex-col justify-center items-center bg-white opacity-90">
            <RingLoader className="self-center" color="#4992FF" />
            <div className="text-center font-medium text-soma-grey-60 text-sm my-5">
              AI가 description, tags를 자동생성중입니다...
            </div>
          </div>
        )}
        {isModalOpen && (
          <CreateMemoModal
            onClose={() => {
              setIsModalOpen(false);
              editor?.setOptions({ editable: true });
            }}
            onCreateBtnClick={handleCreate}
            userId={userId}
            description={descriptionAI.completion}
            tags={tagsAI.completion}
          />
        )}
      </div>
    )
  );
}
