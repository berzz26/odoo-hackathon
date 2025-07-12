import React from 'react';
import TextEditor from '../components/TextEditor';

export default function Test() {
  const handleEditorSave = (data) => {
    console.log('Received data in parent:', data);
  };

  return <TextEditor onSave={handleEditorSave} />;
}
