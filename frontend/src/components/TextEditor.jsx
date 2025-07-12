import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Paragraph from '@editorjs/paragraph';
import Header from '@editorjs/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function TextEditor({ onSave }) {
  const ejInstance = useRef(null);
  const holderRef = useRef(null); // Use a ref for the holder
  const [isEditorReady, setIsEditorReady] = useState(false);
  const sanitizeEditorData = (data) => {
    if (!data || !data.blocks) {
      return {
        blocks: [
          {
            type: 'paragraph',
            data: {
              text: ''
            }
          }
        ]
      };
    }

    const validBlocks = data.blocks.filter(block => {
      if (!block || !block.type || !block.data) {
        return false;
      }
      if (block.type === 'paragraph' || block.type === 'header') {
        if (!block.data.text || typeof block.data.text !== 'string') {
          block.data.text = '';
        }        block.data.text = block.data.text.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
      }

      return true;
    });

    if (validBlocks.length === 0) {
      validBlocks.push({
        type: 'paragraph',
        data: {
          text: ''
        }
      });
    }

    return {
      blocks: validBlocks
    };
  };

  // Function to clear any potential cached data
  const clearEditorCache = () => {
    try {
      // Clear any localStorage data that might be cached
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.includes('editorjs') || key.includes('editor')) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.log('No localStorage to clear or error clearing cache:', error);
    }
  };

  useEffect(() => {
    if (ejInstance.current) return;
    if (!holderRef.current) return; // Wait for the holder ref

    // Clear any cached data before initializing
    clearEditorCache();

    const editor = new EditorJS({
      holder: holderRef.current,
      tools: {
        header: Header,
        paragraph: Paragraph,
      },
      placeholder: 'Start typing here...',
      data: {
        blocks: [
          {
            type: 'paragraph',
            data: {
              text: ''
            }
          }
        ]
      },
      onReady: () => {
        console.log('Editor.js is ready!');
        ejInstance.current = editor;
        setIsEditorReady(true);
      },
      onChange: (api, event) => {
        console.log('Editor content changed:', event);
      },
      onError: (error) => {
        console.error('Editor error:', error);
        if (error.message && error.message.includes('invalid')) {
          console.log('Attempting to recover from data corruption...');
          if (ejInstance.current) {
            ejInstance.current.destroy();
            ejInstance.current = null;
            setIsEditorReady(false);
            clearEditorCache();
            setTimeout(() => {
              const newEditor = new EditorJS({
                holder: holderRef.current,
                tools: {
                  header: Header,
                  paragraph: Paragraph,
                },
                placeholder: 'Start typing here...',
                data: {
                  blocks: [
                    {
                      type: 'paragraph',
                      data: {
                        text: ''
                      }
                    }
                  ]
                },
                onReady: () => {
                  console.log('Editor.js recovered and ready!');
                  ejInstance.current = newEditor;
                  setIsEditorReady(true);
                },
                onError: (recoveryError) => {
                  console.error('Recovery failed:', recoveryError);
                }
              });
            }, 100);
          }
        }
      }
    });

    return () => {
      if (ejInstance.current?.destroy) {
        ejInstance.current.destroy();
        ejInstance.current = null;
        setIsEditorReady(false);
      }
    };
  }, [holderRef.current]); // Depend on holderRef

  const handleSave = async () => {
    if (!ejInstance.current || !isEditorReady) {
      console.warn('Editor not ready');
      return;
    }
    
    try {
      const outputData = await ejInstance.current.save();
      console.log('Raw saved data:', outputData);
      
      // Handle the case where EditorJS returns empty blocks
      if (!outputData.blocks || outputData.blocks.length === 0) {
        console.log('Editor returned empty blocks, creating default structure');
        const defaultData = {
          blocks: [
            {
              type: 'paragraph',
              data: {
                text: ''
              }
            }
          ]
        };
        onSave?.(defaultData);
        return;
      }
      
      // Sanitize the saved data before passing to parent
      const sanitizedData = sanitizeEditorData(outputData);
      console.log('Main data:', sanitizedData);
      
      // Validate the sanitized data before passing it to parent
      if (sanitizedData && sanitizedData.blocks && sanitizedData.blocks.length > 0) {
        onSave?.(sanitizedData);
      } else {
        console.warn('No valid data to save');
      }
    } catch (err) {
      console.error('Saving failed:', err);
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="w-full max-w-4xl bg-white text-black rounded-md shadow-lg p-6">
        <div
          ref={holderRef}
          className="w-full h-[300px] scrollbar-hide overflow-y-auto rounded px-4 py-2"
        ></div>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            disabled={!isEditorReady}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition ${
              isEditorReady 
                ? 'bg-black text-white hover:bg-green-700' 
                : 'bg-gray-400 text-gray-600 cursor-not-allowed'
            }`}
            title={isEditorReady ? "Send" : "Editor not ready"}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </div>
  );
}
