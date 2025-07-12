import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TextEditor from '../components/TextEditor';

export default function QuestionDetail() {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState("");
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Debug logging
    console.log('Question ID from params:', id);
    console.log('All params:', useParams());

    useEffect(() => {
        if (id) {
            fetchQuestionDetails();
        } else {
            setError('Question ID is missing from URL');
            setLoading(false);
        }
    }, [id]);

    const fetchQuestionDetails = async () => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem("authToken");
            if (!token) {
                throw new Error("Please login to view questions");
            }

            console.log('Fetching question with ID:', id);
            const response = await fetch(`https://stackit-backend.up.railway.app/question/getQuestions/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            
            console.log('Response status:', response.status);
            
            if (!response.ok) {
                throw new Error('Failed to fetch question details');
            }
            const data = await response.json();
            console.log('Question data:', data);
            setQuestion(data);
            setAnswers(data.answers || []);
        } catch (err) {
            console.error('Error fetching question:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitAnswer = async (e) => {
        e.preventDefault();
        if (!answer.trim()) return;

        try {
            setIsSubmitting(true);
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('Please login to submit an answer');
            }

            const response = await fetch(`https://stackit-backend.up.railway.app/ans/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    content: answer.trim(),
                    questionId: id
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to submit answer');
            }

            // Refresh the question details to show the new answer
            await fetchQuestionDetails();
            setAnswer(''); // Clear the answer input
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Show error if no ID is found
    if (!id) {
        return (
            <div className="min-h-screen bg-gray-900 text-white">
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <div className="bg-red-500/10 border border-red-500/50 text-red-300 p-4 rounded-xl">
                        Error: Question ID is missing from the URL. Please check your route configuration.
                    </div>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 text-white">
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-300 p-4 rounded-xl mb-6">
                        {error}
                    </div>
                )}

                {question && (
                    <>
                        <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-gray-700/50">
                            <div className="flex justify-between items-start mb-4">
                                <h1 className="text-2xl font-bold">{question.title}</h1>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-400">
                                        Asked {new Date(question.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            <div className="prose prose-invert max-w-none mb-4">
                                {question.description}
                            </div>

                            <div className="flex gap-2">
                                {question.tags?.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="text-xs bg-gray-700/50 px-2 py-1 rounded-md"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-4">
                                {answers.length} {answers.length === 1 ? 'Answer' : 'Answers'}
                            </h2>

                            <div className="space-y-6">
                                {answers.map((answer, index) => (
                                    <div
                                        key={answer.id || index}
                                        className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50"
                                    >
                                        <div className="prose prose-invert max-w-none mb-4">
                                            {answer.content}
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="text-sm text-gray-400">
                                                Answered by {answer.user?.username || 'Anonymous'} on{' '}
                                                {new Date(answer.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                            <h2 className="text-xl font-semibold mb-4">Your Answer</h2>
                            <form onSubmit={handleSubmitAnswer} className="space-y-4">
                                <div className="w-full bg-gray-800/50 border border-gray-700 rounded-xl 
                            focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500/50
                            overflow-hidden">
                                    <TextEditor
                                        onSave={setAnswer}
                                        initialContent=""
                                        className="min-h-[200px] p-4"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 
                         transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                         transform hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    {isSubmitting ? "Posting..." : "Post Answer"}
                                </button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}