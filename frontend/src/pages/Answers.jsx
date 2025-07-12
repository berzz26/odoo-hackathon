import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
const TagBadge = ({ tag }) => (
  <span className="bg-blue-600 text-white px-3 py-1 text-sm rounded-full">
    #{tag}
  </span>
);
const AnswerCard = ({ text }) => (
  <div className="bg-gray-700 p-4 rounded text-white">
    <p>{text}</p>
  </div>
);

export default function Answers() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await fetch(`https://stackit-backend.up.railway.app/getQuestion/${id}`);
        const data = await res.json();
        console.log("Fetched question:", data); // For debugging

        // Ensure answers is always an array
        data.answers = Array.isArray(data.answers) ? data.answers : [];

        setQuestion(data);
      } catch (err) {
        console.error("Error fetching question:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-800 text-white">
      <Navbar />

      <div className="flex justify-center px-4">
        <div className="w-full max-w-4xl min-h-[300px] border border-white p-6 rounded">
          {loading ? (
            <p>Loading...</p>
          ) : question && question.title ? (
            <div>
              <h1 className="text-2xl font-bold mb-2">{question.title}</h1>

              <div className="flex flex-wrap gap-2 mb-4">
                {question.tags?.length > 0 ? (
                  question.tags.map((tag, index) => (
                    <TagBadge key={index} tag={tag} />
                  ))
                ) : (
                  <span className="text-gray-400 italic">No tags</span>
                )}
              </div>

              <p className="text-gray-300 mb-6">
                {question.description || "No description available."}
              </p>

              <div className="mt-10">
                <h2 className="text-xl font-semibold mb-4">Answers</h2>

                {Array.isArray(question.answers) && question.answers.length > 0 ? (
                  <div className="space-y-4">
                    {question.answers.map((ans, idx) => (
                      <AnswerCard key={idx} text={ans.text || ans} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 italic">No answers yet. Be the first to answer!</p>
                )}
              </div>
            </div>
          ) : (
            <p>Question not found or invalid data.</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => window.history.back()}
          className="m-10 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
        >
          ← Back to questions
        </button>
      </div>
    </div>
  );
}
