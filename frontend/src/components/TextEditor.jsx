import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function TextEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello, TipTap!</p>',
  });

  if (!editor) return null;

  return (
    <div className="w-auto flex flex-col justify-center items-center p-4 bg-gray-900 rounded-lg shadow-md">
      
      <EditorContent
        editor={editor}
        className="min-w-[800px] min-h-[200px] border border-gray-700 p-4 rounded-md focus:outline-white bg-black text-white"
      />
      <div className="flex mt-2 gap-2 mb-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="px-3 py-1 rounded bg-gray-600 text-white hover:bg-gray-700"
        >
          Bullet List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().clearContent().run()}
          className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
