import { toast } from 'sonner';
import { EditorState, Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet, EditorView } from '@tiptap/pm/view';
import { postImageInMemo } from '@/service/memos';
import { postImageInQuestion } from '@/service/questions';
import { postImageInAnswer } from '@/service/answers';
import { notifyToast } from '@/service/notification';

const uploadKey = new PluginKey('upload-image');

const UploadImagesPlugin = () =>
  new Plugin({
    key: uploadKey,
    state: {
      init() {
        return DecorationSet.empty;
      },
      apply(tr, set) {
        set = set.map(tr.mapping, tr.doc);
        // See if the transaction adds or removes any placeholders
        const action = tr.getMeta(this as any);
        if (action && action.add) {
          const { id, pos, src } = action.add;

          const placeholder = document.createElement('div');
          placeholder.setAttribute('class', 'img-placeholder');
          const image = document.createElement('img');
          image.setAttribute(
            'class',
            'opacity-40 rounded-lg border border-stone-200'
          );
          image.src = src;
          placeholder.appendChild(image);
          const deco = Decoration.widget(pos + 1, placeholder, {
            id,
          });
          set = set.add(tr.doc, [deco]);
        } else if (action && action.remove) {
          set = set.remove(
            set.find(
              undefined,
              undefined,
              (spec) => spec.id == action.remove.id
            )
          );
        }
        return set;
      },
    },
    props: {
      decorations(state) {
        return this.getState(state);
      },
    },
  });

export default UploadImagesPlugin;

function findPlaceholder(state: EditorState, id: {}) {
  const decos = uploadKey.getState(state);
  const found = decos.find(null, null, (spec: any) => spec.id == id);
  return found.length ? found[0].from : null;
}

export function startImageUpload(
  file: File,
  postId: number,
  type: 'memo' | 'question' | 'answer',
  view: EditorView,
  pos: number,
  routingCallback?: (postId: number) => void
) {
  // check if the file is an image
  if (!file.type.includes('image/')) {
    notifyToast('해당 파일 형식은 제공되지 않습니다.', 'error');
    return;

    // check if the file size is less than 20MB
  } else if (file.size / 1024 / 1024 > 10) {
    notifyToast('파일 사이즈가 너무 큽니다. (max 10MB)', 'error');
    return;
  }

  // A fresh object to act as the ID for this upload
  const id = {};

  // Replace the selection with a placeholder
  const tr = view.state.tr;
  if (!tr.selection.empty) tr.deleteSelection();

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    tr.setMeta(uploadKey, {
      add: {
        id,
        pos,
        src: reader.result,
      },
    });
    view.dispatch(tr);
  };

  handleImageUpload(file, type, postId)
    .then((src) => {
      const { schema } = view.state;

      let pos = findPlaceholder(view.state, id);
      // If the content around the placeholder has been deleted, drop
      // the image
      if (pos == null) return;

      // Otherwise, insert it at the placeholder's position, and remove
      // the placeholder

      // When BLOB_READ_WRITE_TOKEN is not valid or unavailable, read
      // the image locally
      const imageSrc = typeof src === 'object' ? reader.result : src;

      const node = schema.nodes.image.create({ src: imageSrc });
      const transaction = view.state.tr
        .replaceWith(pos, pos, node)
        .setMeta(uploadKey, { remove: { id } });
      view.dispatch(transaction);
      type === 'memo' && routingCallback && routingCallback(postId);
    })
    .catch((err) => {
      const transaction = view.state.tr.setMeta(uploadKey, { remove: { id } });
      view.dispatch(transaction);
      notifyToast(err, 'error');
    });
}

export const handleImageUpload = (
  file: File,
  type: 'memo' | 'question' | 'answer',
  postId: number
) => {
  // upload to Vercel Blob
  return new Promise((resolve, reject) => {
    switch (type) {
      case 'memo':
        postImageInMemo(postId, file).then((res) => {
          if (res?.code) {
            reject(res.message);
          }
          let image = new Image();
          image.src = res.imagePath;
          image.onload = () => {
            resolve(res.imagePath);
          };
        });
        break;
      case 'question':
        postImageInQuestion(file).then((res) => {
          if (res?.code) {
            reject(res.message);
          }
          let image = new Image();
          image.src = res.imagePath;
          image.onload = () => {
            resolve(res.imagePath);
          };
        });
        break;
      case 'answer':
        postImageInAnswer(file).then((res) => {
          if (res?.code) {
            reject(res.message);
          }
          let image = new Image();
          image.src = res.imagePath;
          image.onload = () => {
            resolve(res.imagePath);
          };
        });
        break;
      default:
        throw new Error('알맞은 postType이 아님');
    }
  });
};
