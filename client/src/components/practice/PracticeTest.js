import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

function PracticeTest() {
    const location = useLocation();
    const navigate = useNavigate();
    const { questions } = location.state || { questions: null };

    if (!questions) {
        return (
            <div className="p-8">
                <p>No questions found.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                >
                    <BiArrowBack className="w-5 h-5" />
                    Back
                </button>
                <h1 className="text-2xl font-bold">{questions.title}</h1>
            </div>

            <div className="space-y-6">
                {questions.questions.map((q, index) => (
                    <div key={q.id} className="bg-white p-6 rounded-xl shadow-md">
                        <h3 className="font-medium mb-4">
                            Question {index + 1}: {q.question}
                        </h3>
                        <p className="text-gray-600">{q.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PracticeTest;
