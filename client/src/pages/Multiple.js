import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Multiple = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Example questions array - replace with your actual questions
  const questions = [
    {
      questionText: 'What is React?',
      options: [
        'A JavaScript library for building user interfaces',
        'A programming language',
        'A database management system',
        'An operating system'
      ],
      correctAnswer: 0
    },
    // Add more questions as needed
  ];

  const handleAnswerSelect = (optionIndex) => {
    setSelectedAnswer(optionIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
    } else {
      setShowScore(true);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-[#349D69] h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="mt-2 text-right text-sm text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>

        {showScore ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Completed! 🎉</h2>
            <p className="text-xl mb-6">
              You scored {score} out of {questions.length}
            </p>
            <button
              onClick={() => navigate('/dash')}
              className="bg-[#349D69] text-white px-6 py-2 rounded-lg hover:bg-[#175773] transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Question Section */}
            <div className="p-6 bg-[#175773] text-white">
              <h2 className="text-xl font-semibold">
                {questions[currentQuestion].questionText}
              </h2>
            </div>

            {/* Options Section */}
            <div className="p-6 space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    selectedAnswer === index
                      ? 'bg-[#349D69] text-white'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="p-6 border-t">
              <button
                onClick={handleNext}
                disabled={selectedAnswer === null}
                className={`w-full py-3 rounded-lg transition-colors ${
                  selectedAnswer === null
                    ? 'bg-gray-200 cursor-not-allowed'
                    : 'bg-[#349D69] text-white hover:bg-[#175773]'
                }`}
              >
                {currentQuestion === questions.length - 1 ? 'Finish' : 'Next Question'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Multiple;