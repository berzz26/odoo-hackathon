import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function TextEditor({ onSave }) {
  const ejInstance = useRef(null);

  useEffect(() => {
    if (ejInstance.current) return;
    if (ejInstance.current?.isReady) return;


    const editor = new EditorJS({
      holder: 'editorjs',
      tools: {
        header: Header,
      },
      placeholder: 'Start typing here...',
      onReady: () => {
        console.log('Editor.js is ready!');
        ejInstance.current = editor;
      },
    });

    return () => {
      if (ejInstance.current?.destroy) {
        ejInstance.current.destroy();
        ejInstance.current = null;
      }
    };
  }, []);

  const handleSave = async () => {
    if (!ejInstance.current) return;
    try {
      const outputData = await ejInstance.current.save();
      console.log('Saved data:', outputData);
      onSave?.(outputData);
    } catch (err) {
      console.error('Saving failed:', err);
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="w-full max-w-4xl bg-white text-black rounded-md shadow-lg p-6">
        <div
          id="editorjs"
          className="w-full h-[300px] scrollbar-hide overflow-y-auto  rounded px-4 py-2"
        ></div>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full hover:bg-green-700 transition"
            title="Send"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </div>
  );
}
