import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faList, faTimes, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
export default function TextEditor({ height = 'min-h-[200px]', width = 'w-full' }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle.configure({
        types: ['textStyle'],
      }),
    ],
    content: '',
  });

  const handleSend = () => {
    if (!editor) return;

    const html = editor.getHTML();
    const isEmpty = html === 'NULL' || !html.trim();

    if (isEmpty) return;

    console.log(html);
    editor.commands.clearContent();
  };

  if (!editor) return null;

  return (
    <div className="min-h-screen w-screen bg-gray-800 text-black flex items-center justify-center">
      <div className="w-full px-8">
        <div className="w-full flex flex-col items-center p-6 bg-gray-700 border border-gray-400 rounded-lg shadow-xl">
          <div className="w-full relative">
            <EditorContent
              editor={editor}
              className={`${width} ${height} border border-gray-400 p-4 bg-gray-700 text-white`}
            />

            <button
              type="button"
              onClick={handleSend}
              className="w-10 h-10 absolute bottom-2 right-2 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-white shadow-md"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>

          <div className="w-full h-[40px] border border-gray-400 border-t-0 outline-black flex items-center justify-start mt-0">
            <div className="flex justify-between items-stretch w-full h-full">
              <div className="flex flex-row">
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className="h-full w-[30px] flex items-center justify-center bg-green-600 text-white hover:bg-gray-400 rounded-none"
                >
                  <FontAwesomeIcon icon={faBold} />
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className="h-full w-[30px] flex items-center justify-center bg-green-600 text-white hover:bg-gray-400 rounded-none"
                >
                  <FontAwesomeIcon icon={faItalic} />
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  className="h-full w-[30px] flex items-center justify-center bg-green-600 text-white hover:bg-gray-400 rounded-none"
                >
                  <FontAwesomeIcon icon={faList} />
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().clearContent().run()}
                  className="h-full w-[30px] flex items-center justify-center bg-green-600 text-white hover:bg-gray-400 rounded-none"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
