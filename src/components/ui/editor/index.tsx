'use client';

import { Editor, EditorContent } from '@tiptap/react';
// import useLocalStorage from '@/lib/hooks/use-local-storage';
// import { useDebouncedCallback } from 'use-debounce';
// import { useCompletion } from 'ai/react';
import { toast } from 'sonner';
// import va from '@vercel/analytics';
import DEFAULT_EDITOR_CONTENT from './default-content';
import { EditorBubbleMenu } from './components';
// import { getPrevText } from '@/app/lib/editor';

export default function MyEditor({ editor }: { editor: Editor | null }) {
  // const [content, setContent] = useLocalStorage(
  //   'content',
  //   DEFAULT_EDITOR_CONTENT
  // );

  // const [saveStatus, setSaveStatus] = useState('Saved');

  // const [hydrated, setHydrated] = useState(false);

  // const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
  //   const json = editor.getJSON();
  //   setSaveStatus('Saving...');
  //   setContent(json);
  //   // Simulate a delay in saving.
  //   setTimeout(() => {
  //     setSaveStatus('Saved');
  //   }, 500);
  // }, 750);

  // const { complete, completion, isLoading, stop } = useCompletion({
  //   id: 'novel',
  //   api: '/api/generate',
  //   onFinish: (_prompt, completion) => {
  //     editor?.commands.setTextSelection({
  //       from: editor.state.selection.from - completion.length,
  //       to: editor.state.selection.from,
  //     });
  //   },
  //   onError: err => {
  //     toast.error(err.message);
  //     if (err.message === 'You have reached your request limit for the day.') {
  //       va.track('Rate Limit Reached');
  //     }
  //   },
  // });

  // const prev = useRef('');

  // Insert chunks of the generated text
  // useEffect(() => {
  //   const diff = completion.slice(prev.current.length);
  //   prev.current = completion;
  //   editor?.commands.insertContent(diff);
  // }, [isLoading, editor, completion]);

  // useEffect(() => {
  //   // if user presses escape or cmd + z and it's loading,
  //   // stop the request, delete the completion, and insert back the "++"
  //   const onKeyDown = (e: KeyboardEvent) => {
  //     if (e.key === 'Escape' || (e.metaKey && e.key === 'z')) {
  //       stop();
  //       if (e.key === 'Escape') {
  //         editor?.commands.deleteRange({
  //           from: editor.state.selection.from - completion.length,
  //           to: editor.state.selection.from,
  //         });
  //       }
  //       editor?.commands.insertContent('++');
  //     }
  //   };
  //   const mousedownHandler = (e: MouseEvent) => {
  //     e.preventDefault();
  //     e.stopPropagation();
  //     stop();
  //     if (window.confirm('AI writing paused. Continue?')) {
  //       complete(editor?.getText() || '');
  //     }
  //   };
  //   if (isLoading) {
  //     document.addEventListener('keydown', onKeyDown);
  //     window.addEventListener('mousedown', mousedownHandler);
  //   } else {
  //     document.removeEventListener('keydown', onKeyDown);
  //     window.removeEventListener('mousedown', mousedownHandler);
  //   }
  //   return () => {
  //     document.removeEventListener('keydown', onKeyDown);
  //     window.removeEventListener('mousedown', mousedownHandler);
  //   };
  // }, [stop, isLoading, editor, complete, completion.length]);

  // Hydrate the editor with the content from localStorage.
  // useEffect(() => {
  //   if (editor && content && !hydrated) {
  //     editor.commands.setContent(content);
  //     setHydrated(true);
  //   }
  // }, [editor, content, hydrated]);

  return (
    <div
      onClick={() => {
        editor?.chain().focus().run();
      }}
      className="relative min-h-[550px] w-full border-stone-200 bg-white p-4 sm:rounded-lg sm:border sm:shadow-lg"
    >
      {/* <div className="absolute right-5 top-5 mb-5 rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400">
        {saveStatus}
      </div> */}
      {editor && <EditorBubbleMenu editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}
