import React, { useState } from 'react';
import TextEditor from '../components/TextEditor';

export default function Test() {
  const [savedData, setSavedData] = useState(null);

  const handleEditorSave = (data) => {
    setSavedData(data);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Editor Test Page</h1>
        <TextEditor onSave={handleEditorSave} />
      </div>
    </div>
  );
}
