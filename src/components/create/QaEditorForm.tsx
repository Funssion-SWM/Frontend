'use client';

import MyEditor from '@/components/editor';
import { useEditor } from '@tiptap/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react';
import { getDescription } from '@/service/description';
import { ModalContext } from '@/context/ModalProvider';
import { handleTiptapExtensions } from '@/components/editor/extensions';
import { handleTiptapEditorProps } from '@/components/editor/props';
import { DraftsInModalContext } from '@/context/DraftsInModalProvider';
import Tag from '@/components/shared/Tag';
import { notifyToast } from '@/service/notification';
import BlueBtn from '../shared/btn/BlueBtn';
import { createQuestion, updateQuestion } from '@/service/questions';

export default function QaEditorForm() {
  const router = useRouter();
  const { open } = useContext(ModalContext);

  const questionId = Number(useSearchParams()?.get('id'));

  const [title, setTitle] = useState<string>('');
  const [inputTag, setInputTag] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [contents, setContents] = useState('');
  const [isQuestionLoading, setIsQuestiomLoading] = useState(false);

  // const temporarySaveCallbackForSavingImage = async () => {
  //   return createOrUpdateMemo(
  //     `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/memos`,
  //     {
  //       memoTitle: 'temp',
  //       memoDescription: 'temp',
  //       memoText:
  //         '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"temp"}]}]}',
  //       memoColor: selectedColor,
  //       memoTags: tags,
  //       isTemporary: true,
  //     }
  //   ).then((data) => data.questionId);
  // };

  // const routingAfterUploadImage = (questionId: number) => {
  //   router.push(`/create/memo?id=${questionId}`);
  // };

  // const isInitialMount = useRef(true);
  // // questionId가 변경되면 실행 for 이미지 임시저장
  // useEffect(() => {
  //   if (isInitialMount.current) {
  //     isInitialMount.current = false;
  //   } else {
  //     console.log('hello');
  //     if (questionId) {
  //       const memoDescription = getDescription(contents);
  //       createOrUpdateMemo(
  //         `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/memos/${questionId}`,
  //         {
  //           memoTitle: title,
  //           memoDescription,
  //           memoText: contents,
  //           memoColor: selectedColor,
  //           memoTags: tags,
  //           isTemporary: true,
  //         }
  //       );
  //     }
  //   }
  // }, [questionId]);

  const editor = useEditor({
    extensions: handleTiptapExtensions(
      questionId
      // temporarySaveCallbackForSavingImage,
      // (questionId: number) => routingAfterUploadImage(questionId)
    ),
    editorProps: handleTiptapEditorProps(
      questionId
      // temporarySaveCallbackForSavingImage,
      // (questionId: number) => routingAfterUploadImage(questionId)
    ),
    autofocus: questionId ? 'end' : false,
    onCreate: async (e) => {
      // if (questionId)
      //   await getMemoById(questionId).then(
      //     ({ memoTitle, memoColor, memoTags, memoText }) => {
      //       setTitle(memoTitle);
      //       setTags(memoTags);
      //       e.editor.commands.setContent(JSON.parse(memoText));
      //     }
      //   );
      setIsQuestiomLoading(true);
    },
    onUpdate: (e) => {
      setContents(JSON.stringify(e.editor.getJSON()));
    },
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (inputTag === '' && e.key === 'Backspace') {
      setTags((preTags) => preTags.slice(0, -1));
      return;
    }
    if ((inputTag !== '' && e.key === 'Enter') || e.key === ',') {
      !tags.includes(inputTag) && setTags([...tags, inputTag]);
      setInputTag('');
    }
  };

  const savePost = () => {
    if (title === '') {
      alert('제목을 작성해주세요!');
      return;
    }

    if (title.length > 75) {
      alert('제목 수 제한 75자를 초과하였습니다!');
      return;
    }

    if (contents === '') {
      alert('내용을 작성해주세요!');
      return;
    }

    const questionDescription = getDescription(contents);
    questionId
      ? updateQuestion({ title, text: contents, tags }, questionId)
          .then(() => {
            router.push(`/questions/${questionId}`);
            router.refresh();
          })
          .catch(() => {
            notifyToast('등록에 실패했습니다.', 'error');
          })
      : createQuestion({ title, text: contents, tags })
          .then(() => {
            router.push(`/questions`);
            router.refresh();
          })
          .catch(() => {
            notifyToast('등록에 실패했습니다.', 'error');
          });
  };

  const edirotRef = useRef<HTMLDivElement>(null);
  const [currentScrollHeight, setCurrentScrollHeight] = useState<number>(0);
  useEffect(() => {
    if (edirotRef.current && document.scrollingElement) {
      if (currentScrollHeight < edirotRef.current.scrollHeight) {
        document.scrollingElement.scrollTop = edirotRef.current.scrollHeight;
      }
      setCurrentScrollHeight(edirotRef.current.scrollHeight);
    }
  }, [editor?.state.selection, currentScrollHeight]);

  return (
    isQuestionLoading && (
      <div className="flex w-full" ref={edirotRef}>
        <div
          className={`relative flex flex-col rounded-lg  px-2 pt-2 pb-4 min-h-screen sm:min-h-for-fit-screen w-full bg-white`}
        >
          <div className="flex justify-end gap-2 mr-1 my-1">
            <BlueBtn text="등록" onClick={savePost} />
          </div>
          <input
            type="text"
            placeholder="제목을 입력해주세요."
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full outline-none text-2xl sm:text-4xl px-4 py-3 bg-transparent font-bold mt-2 border-t-[0.5px] border-soma-grey-49"
            autoFocus={questionId ? false : true}
          />
          <div className="flex flex-wrap gap-1 mx-3 mb-1">
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
              placeholder="태그를 입력 후 엔터를 눌러주세요."
              name="tag"
              value={inputTag}
              onChange={(e) => setInputTag(e.target.value)}
              onKeyDown={handleKeyDown}
              className="grow outline-none p-1 text-sm sm:text-base bg-transparent"
            />
          </div>
          <MyEditor editor={editor} />
          <button
            className="absolute bottom-3 right-5 text-soma-grey-50"
            onClick={() =>
              open('나가시겠습니까?', () => {
                router.push(`/questions`);
              })
            }
          >
            나가기
          </button>
        </div>
      </div>
    )
  );
}
