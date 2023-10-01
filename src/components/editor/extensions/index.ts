import StarterKit from '@tiptap/starter-kit';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import TiptapLink from '@tiptap/extension-link';
import TiptapImage from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import TiptapUnderline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import { Markdown } from 'tiptap-markdown';
import Highlight from '@tiptap/extension-highlight';
import { handleSlashCommand } from './slash-command';
import { InputRule } from '@tiptap/core';
import UploadImagesPlugin from '@/components/editor/plugins/upload-images';
import UpdatedImage from './updated-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import { lowlight } from 'lowlight/lib/common.js';
import '@/styles/codeblocklowlight.css';

lowlight.registerLanguage('html', html);
lowlight.registerLanguage('css', css);
lowlight.registerLanguage('js', js);
lowlight.registerLanguage('ts', ts);

export const handleTiptapExtensions = (
  memoId: number | undefined,
  callback?: () => Promise<number>,
  routingCallback?: (id: number) => void
) => {
  return [
    StarterKit.configure({
      bulletList: {
        HTMLAttributes: {
          class: 'list-disc list-outside leading-3 -mt-2',
        },
      },
      orderedList: {
        HTMLAttributes: {
          class: 'list-decimal list-outside leading-3 -mt-2',
        },
      },
      listItem: {
        HTMLAttributes: {
          class: 'leading-normal -mb-2',
        },
      },
      blockquote: {
        HTMLAttributes: {
          class: 'border-l-4 border-stone-700',
        },
      },
      code: {
        HTMLAttributes: {
          class:
            'rounded-md bg-soma-grey-30 px-1.5 py-1 font-mono font-medium text-soma-red-60',
          spellcheck: 'false',
        },
      },
      horizontalRule: false,
      dropcursor: {
        color: '#DBEAFE',
        width: 4,
      },
      gapcursor: false,
    }),
    // patch to fix horizontal rule bug: https://github.com/ueberdosis/tiptap/pull/3859#issuecomment-1536799740
    HorizontalRule.extend({
      addInputRules() {
        return [
          new InputRule({
            find: /^(?:---|—-|___\s|\*\*\*\s)$/,
            handler: ({ state, range }) => {
              const attributes = {};

              const { tr } = state;
              const start = range.from;
              let end = range.to;

              tr.insert(start - 1, this.type.create(attributes)).delete(
                tr.mapping.map(start),
                tr.mapping.map(end)
              );
            },
          }),
        ];
      },
    }).configure({
      HTMLAttributes: {
        class: 'mt-4 mb-6 border-t border-stone-300',
      },
    }),
    CodeBlockLowlight.configure({
      HTMLAttributes: {
        class:
          'rounded-lg bg-soma-grey-70 p-5 font-mono font-medium text-white my-3',
      },
      lowlight,
    }),
    TiptapLink.configure({
      HTMLAttributes: {
        class:
          'text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer',
      },
    }),
    TiptapImage.extend({
      addProseMirrorPlugins() {
        return [UploadImagesPlugin()];
      },
    }).configure({
      allowBase64: true,
      HTMLAttributes: {
        class: 'rounded-lg border border-stone-200',
      },
    }),
    UpdatedImage.configure({
      HTMLAttributes: {
        class: 'rounded-lg border border-stone-200',
      },
    }),
    Placeholder.configure({
      placeholder: ({ node }) => {
        if (node.type.name === 'heading') {
          return `Heading ${node.attrs.level}`;
        }
        // return "Press '/' for commands, or '++' for AI autocomplete";
        return "명령어는 '/' , 텍스트 자동 생성은 질문 작성 후 '++' 입력";
      },
      includeChildren: true,
    }),
    handleSlashCommand(memoId, callback, routingCallback),
    TiptapUnderline,
    TextStyle,
    Color,
    Highlight.configure({
      multicolor: true,
    }),
    TaskList.configure({
      HTMLAttributes: {
        class: 'not-prose pl-2',
      },
    }),
    TaskItem.configure({
      HTMLAttributes: {
        class: 'flex items-start my-1',
      },
      nested: true,
    }),
    Markdown.configure({
      html: false,
      transformCopiedText: true,
    }),
  ];
};
