import React, { useState } from "react";

export default function Home() {
  const [filter, setFilter] = useState("Newest");

  return (
    <div className="max-w-3xl mx-auto p-6 border border-gray-600 rounded-xl">
      <nav className="bg-gray-800 px-6 py-4 rounded-t-lg -mx-6 -mt-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">StackIt</h1>
          <button className="border border-white px-4 py-1 rounded-full hover:bg-gray-700 transition">
            Login
          </button>
        </div>
      </nav>

      <section className="mt-6">
        <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
            Ask New Question
          </button>

          <div className="flex items-center gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-gray-800 text-white rounded-lg px-3 py-1"
            >
              <option>Newest</option>
              <option>Unanswered</option>
              <option>Most Votes</option>
            </select>
            <button className="bg-gray-700 text-white px-3 py-1 rounded-lg hover:bg-gray-600 transition">
              More ▼
            </button>
          </div>

          <div className="flex items-center border border-gray-600 rounded-lg overflow-hidden">
            <input
              type="search"
              placeholder="Search"
              className="bg-gray-900 px-3 py-1 focus:outline-none"
            />
            
          </div>
        </div>

        <section className="space-y-4 mb-6">
          <div className="border border-gray-600 rounded-lg p-4 relative">
            <h3 className="text-lg font-semibold mb-2">How to join 2 columns in a data set to make a separate column in SQL</h3>
            <div className="flex gap-2 mb-2">
              <span className="text-xs border border-gray-600 px-2 py-1 rounded-md">SQL</span>
              <span className="text-xs border border-gray-600 px-2 py-1 rounded-md">Data</span>
            </div>
            <p className="text-sm text-gray-300 mb-2">
              I do not know the code for it as I am a beginner. As an example what I need to do is like there is a column 1 containing First name and column 2 consists of last name. I want a column to combine ...
            </p>
            <p className="text-xs italic text-gray-400">User Name</p>
            <div className="absolute top-3 right-3 border border-gray-600 text-xs px-2 py-1 rounded-md">
              5 ans
            </div>
          </div>

          <div className="border border-gray-600 rounded-lg p-4 relative">
            <h3 className="text-lg font-semibold mb-2">Question.....</h3>
            <div className="flex gap-2 mb-2">
              <span className="text-xs border border-gray-600 px-2 py-1 rounded-md">Tag1</span>
              <span className="text-xs border border-gray-600 px-2 py-1 rounded-md">Tag2</span>
            </div>
            <p className="text-sm text-gray-300 mb-2">Descriptions....</p>
            <p className="text-xs italic text-gray-400">User Name</p>
            <div className="absolute top-3 right-3 border border-gray-600 text-xs px-2 py-1 rounded-md">
              3 ans
            </div>
          </div>

          <div className="border border-gray-600 rounded-lg p-4 relative">
            <h3 className="text-lg font-semibold mb-2">Question.....</h3>
            <div className="flex gap-2 mb-2">
              <span className="text-xs border border-gray-600 px-2 py-1 rounded-md">Tag1</span>
              <span className="text-xs border border-gray-600 px-2 py-1 rounded-md">Tag2</span>
            </div>
            <p className="text-sm text-gray-300 mb-2">Descriptions....</p>
            <p className="text-xs italic text-gray-400">User Name</p>
            <div className="absolute top-3 right-3 border border-gray-600 text-xs px-2 py-1 rounded-md">
              2 ans
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}