import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Answers() {
  const { id } = useParams();
  const [filter, setFilter] = useState("Newest");
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://stackit-backend.up.railway.app/getQuestion/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching question:", err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className=" flex flex-col min-h-screen bg-gray-800 text-white">
      <Navbar />

      <div className="flex justify-center">
        <div className="w-full max-w-4xl min-h-[300px] border border-white p-6 rounded">
          {loading ? (
            <p>Loading...</p>
          ) : question ? (
            <div>
              <h1 className="text-2xl font-bold mb-2">{question.title}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {question.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-700 text-white px-3 py-1 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-gray-300">{question.description}</p>
            </div>
          ) : (
            <p>Question not found.</p>
          )}
        </div>
        
      </div>
      <div className="flex justify-end">
          <button
            onClick={() => window.history.back()}
            className="m-10 bg-gray-700 rounded hover:bg-gray-600 text-white"
          >
            ← Back to questions
          </button>
      </div>

      
    </div>
  );
}
