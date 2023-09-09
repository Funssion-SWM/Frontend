'use client';

import SelectColorBar from '@/components/create/memo/SelectColorBar';
import MyEditor from '@/components/editor';
import { useEditor } from '@tiptap/react';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import BlueBtn from '../../shared/btn/BlueBtn';
import { createOrUpdateMemo, getMemoDrafts } from '@/service/memos';
import { getPrevText } from '@/lib/editor';
import { useCompletion } from 'ai/react';
import { getDescription } from '@/service/description';
import { ModalContext } from '@/context/ModalProvider';
import { TiptapExtensions } from '@/components/editor/extensions';
import { TiptapEditorProps } from '@/components/editor/props';
import { Memo, MemoColor } from '@/types/memo';
import WhiteBtnWithCount from '@/components/shared/btn/WhiteBtnWithCount';
import FakeEditor from '@/components/editor/components/FakeEditor';
import { useDebounce } from '@/hooks/useDebounce';
import { toast } from 'react-toastify';
import { DraftsInModalContext } from '@/context/DraftsInModalProvider';
import { TEMPORARY_SAVE_INTERVAL_TIME } from '@/utils/const';
import Tag from '@/components/shared/Tag';

type Props = {
  preTitle?: string;
  preContent?: object;
  preColor?: MemoColor;
  preMemoTags?: string[];
  alreadyExists: boolean;
  memoId?: number;
};

export default function EditorForm({
  preTitle = '',
  preContent,
  preColor = 'yellow',
  preMemoTags = [],
  alreadyExists,
  memoId,
}: Props) {
  const router = useRouter();
  const { open } = useContext(ModalContext);
  const { openDrafts } = useContext(DraftsInModalContext);

  const { complete, completion, isLoading, stop } = useCompletion({
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
      console.log(err);
    },
  });

  const [contents, setContents] = useState(JSON.stringify(preContent));
  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    content: preContent,
    onUpdate: (e) => {
      setContents(JSON.stringify(e.editor.getJSON()));
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
      }
    },
  });

  const fakeEditor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    editable: false,
  });

  useEffect(() => {
    fakeEditor?.commands.setContent(completion);
  }, [isLoading, fakeEditor, completion]);

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

  const [title, setTitle] = useState<string>(preTitle);
  const [selectedColor, setSelectedColor] = useState<MemoColor>(preColor);
  const [inputTag, setInputTag] = useState<string>('');
  const [tags, setTags] = useState<string[]>(preMemoTags);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (inputTag === '' && e.key === 'Backspace') {
      setTags((preTags) => preTags.slice(0, -1));
      return;
    }
    if ((inputTag !== '' && e.key === 'Enter') || e.key === ',') {
      !tags.includes(inputTag) && setTags([...tags, inputTag]);
      setInputTag('');
      console.log(tags);
    }
  };

  const temporaryContents = useDebounce(contents, TEMPORARY_SAVE_INTERVAL_TIME);

  // 자동 임시 저장
  useEffect(() => {
    if (
      !title ||
      !temporaryContents ||
      !contents ||
      temporaryContents === JSON.stringify(preContent) ||
      isLoading
    )
      return;

    const memoDescription = getDescription(contents);
    createOrUpdateMemo(
      `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/memos${
        alreadyExists ? `/${memoId}` : ''
      }`,
      {
        memoTitle: title,
        memoDescription,
        memoText: temporaryContents,
        memoColor: selectedColor,
        memoTags: tags,
        isTemporary: true,
      }
    ).then((data) => {
      toast('임시 저장되었습니다.', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'success',
      });
      !alreadyExists && router.push(`/create/memo/${data.memoId}`);
    });
  }, [temporaryContents]);

  const [drafts, setDrafts] = useState<Memo[]>([]);

  const first = async () => {
    getMemoDrafts().then((data) => setDrafts(data));
  };

  useEffect(() => {
    first();
  }, []);

  const savePost = (saveMode: 'permanent' | 'temporary') => {
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
        alreadyExists ? `/${memoId}` : ''
      }`,
      {
        memoTitle: title,
        memoDescription,
        memoText,
        memoColor: selectedColor,
        memoTags: tags,
        isTemporary: saveMode === 'temporary',
      }
    ).then((data) => {
      if (saveMode === 'temporary') {
        !alreadyExists && router.push(`/create/memo/${data.memoId}`);
      } else {
        alreadyExists ? router.push(`/memos/${memoId}`) : router.push('/memos');
      }
      router.refresh();
    });
  };

  return (
    <div className="flex w-full">
      <div
        className={`relative flex flex-col rounded-lg shadow-lg px-4 py-2 min-h-screen sm:min-h-for-fit-screen w-full ${
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
        <div className="flex justify-end">
          <WhiteBtnWithCount
            text="임시저장"
            count={drafts.length}
            onClickBtn={() => savePost('temporary')}
            onClickCount={() => openDrafts(drafts)}
            extraStyle="mr-2"
          />
          <BlueBtn text="등록" onClick={() => savePost('permanent')} />
        </div>
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full outline-none text-2xl sm:text-4xl px-4 py-3 bg-transparent font-bold mt-2 border-t-2 border-gray-400"
          autoFocus
        />
        <div className="flex flex-wrap gap-1 mx-4 mb-1">
          {tags.map((tag, idx) => (
            <Tag
              key={idx}
              tagText={tag}
              onClick={() =>
                setTags((preTags) => preTags.filter((item) => item !== tag))
              }
            />
          ))}
          <input
            type="text"
            placeholder="태그를 입력해주세요."
            name="tag"
            value={inputTag}
            onChange={(e) => setInputTag(e.target.value)}
            onKeyDown={handleKeyDown}
            className="grow outline-none p-1 text-sm sm:text-base bg-transparent"
          />
        </div>
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
      {isLoading && <FakeEditor editor={fakeEditor} />}
    </div>
  );
}
