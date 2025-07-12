import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';

export default function Home() {
  const [filter, setFilter] = useState("Newest");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('authToken') !== null;

  useEffect(() => {
    fetchQuestions();
  }, [filter]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("https://stackit-backend.up.railway.app/question/getQuestions");
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      const data = await response.json();
      
      // Sort based on filter
      const sortedQuestions = [...data];
      if (filter === "Newest") {
        sortedQuestions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (filter === "Most Votes") {
        sortedQuestions.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
      } else if (filter === "Unanswered") {
        sortedQuestions.sort((a, b) => (a.answers?.length || 0) - (b.answers?.length || 0));
      }
      
      setQuestions(sortedQuestions);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAskQuestion = () => {
    if (isLoggedIn) {
      navigate("/askquestion");
    } else {
      alert("Please login first to perform this action");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="w-full">
        <Navbar />

        <div className="bg-gray-900 w-full min-h-[calc(100vh-72px)] px-4 py-6 max-w-7xl mx-auto">
          <section className="mb-8 w-full">
            <div className="flex flex-wrap gap-4 items-center justify-between mb-6 w-full">
              <button
                onClick={handleAskQuestion}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2.5 rounded-lg 
                        hover:from-green-700 hover:to-green-800 transition duration-200 
                        transform hover:scale-[1.02] active:scale-[0.98]
                        font-medium shadow-lg hover:shadow-green-500/25">
                Ask New Question
              </button>

              <div className="flex items-center gap-2">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700
                           focus:outline-none focus:ring-2 focus:ring-green-500/50"
                >
                  <option>Newest</option>
                  <option>Unanswered</option>
                  <option>Most Votes</option>
                </select>
              </div>

              <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden flex-1 max-w-md
                            focus-within:ring-2 focus-within:ring-green-500/50 focus-within:border-green-500/50">
                <input
                  type="search"
                  placeholder="Search questions..."
                  className="bg-gray-800 px-4 py-2 focus:outline-none w-full text-white placeholder-gray-400"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-300 p-4 rounded-xl mb-6">
                {error}
              </div>
            )}

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
              </div>
            ) : (
              <section className="space-y-4 w-full">
                {questions.map((question) => (
                  <div
                    key={question.id}
                    onClick={() => navigate(`/question/${question.id}`)}
                    className="border border-gray-700 rounded-xl p-6 relative w-full
                             hover:border-green-500/50 hover:bg-gray-800/50 transition duration-200 cursor-pointer
                             transform hover:scale-[1.01] hover:shadow-lg"
                  >
                    <h3 className="text-xl font-semibold mb-3 text-gray-100">{question.title}</h3>
                    <div className="flex gap-2 mb-3">
                      {question.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs border border-gray-600 px-2 py-1 rounded-md
                                   bg-gray-800/50 text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                      {question.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-400">
                        Asked by {question.author?.name || 'Anonymous'} • {
                          new Date(question.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })
                        }
                      </p>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-300">
                          {question.answers?.length || 0} answers
                        </span>
                        <span className="text-sm text-gray-300">
                          {(question.upvotes || 0) - (question.downvotes || 0)} votes
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {questions.length === 0 && !loading && (
                  <div className="text-center py-12">
                    <p className="text-gray-400">No questions found</p>
                  </div>
                )}
              </section>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}