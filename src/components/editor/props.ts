import { EditorProps } from '@tiptap/pm/view';
import { startImageUpload } from './plugins/upload-images';

export function handleTiptapEditorProps(
  memoId: number | undefined,
  callback?: () => Promise<number>,
  routingCallback?: (id: number) => void
): EditorProps {
  return {
    attributes: {
      class: `prose-sm sm:prose-lg prose-headings:my-2 prose-p:my-0 prose-stone dark:prose-invert prose-headings:font-display font-default focus:outline-none max-w-full`,
    },
    handleDOMEvents: {
      keydown: (_view, event) => {
        // prevent default event listeners from firing when slash command is active
        if (['ArrowUp', 'ArrowDown', 'Enter'].includes(event.key)) {
          const slashCommand = document.querySelector('#slash-command');
          if (slashCommand) {
            return true;
          }
        }
      },
    },
    handlePaste: (view, event) => {
      if (
        event.clipboardData &&
        event.clipboardData.files &&
        event.clipboardData.files[0]
      ) {
        event.preventDefault();
        const file = event.clipboardData.files[0];
        const pos = view.state.selection.from;
        memoId
          ? startImageUpload(file, memoId, view, pos)
          : callback &&
            callback().then((memoId) =>
              startImageUpload(file, memoId, view, pos, routingCallback)
            );
        return true;
      }
      return false;
    },
    handleDrop: (view, event, _slice, moved) => {
      if (
        !moved &&
        event.dataTransfer &&
        event.dataTransfer.files &&
        event.dataTransfer.files[0]
      ) {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        const coordinates = view.posAtCoords({
          left: event.clientX,
          top: event.clientY,
        });
        // here we deduct 1 from the pos or else the image will create an extra node
        memoId
          ? startImageUpload(file, memoId, view, coordinates!.pos - 1)
          : callback &&
            callback().then((memoId) =>
              startImageUpload(file, memoId, view, coordinates!.pos - 1)
            );
        return true;
      }
      return false;
    },
  };
}
