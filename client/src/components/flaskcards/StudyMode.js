import React, { useState } from 'react';
import { BiArrowBack, BiRotateLeft, BiRightArrowAlt, BiLeftArrowAlt } from 'react-icons/bi';

function StudyMode({ cards, deckName, onExit }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [completedCards, setCompletedCards] = useState(new Set());

    const handleNext = () => {
        setIsFlipped(false);
        setCurrentIndex((prev) => (prev + 1) % cards.length);
        setCompletedCards(prev => new Set(prev.add(currentIndex)));
    };

    const handlePrevious = () => {
        setIsFlipped(false);
        setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    };

    const handleRestart = () => {
        setCurrentIndex(0);
        setIsFlipped(false);
        setCompletedCards(new Set());
    };

    const progress = (completedCards.size / cards.length) * 100;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-3xl mx-auto space-y-6">
                <div className="flex justify-between items-center">
                    <button
                        onClick={onExit}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                    >
                        <BiArrowBack className="w-5 h-5" />
                        Back to Deck
                    </button>
                    <h2 className="text-xl font-bold">{deckName}</h2>
                    <button
                        onClick={handleRestart}
                        className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
                    >
                        <BiRotateLeft className="w-5 h-5" />
                        Restart
                    </button>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                        className="bg-green-500 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                {/* Card display */}
                <div 
                    className="bg-white rounded-xl shadow-lg p-8 min-h-[400px] cursor-pointer"
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    <div className="text-center">
                        <div className="text-sm text-gray-500 mb-4">
                            Card {currentIndex + 1} of {cards.length}
                        </div>
                        <div 
                            className="text-xl transition-all duration-300"
                            dangerouslySetInnerHTML={{ 
                                __html: isFlipped ? cards[currentIndex].answer : cards[currentIndex].question 
                            }}
                        />
                        <div className="mt-4 text-sm text-gray-400">
                            Click to {isFlipped ? 'see question' : 'see answer'}
                        </div>
                    </div>
                </div>

                {/* Navigation controls */}
                <div className="flex justify-between items-center">
                    <button
                        onClick={handlePrevious}
                        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800"
                        disabled={currentIndex === 0}
                    >
                        <BiLeftArrowAlt className="w-5 h-5" />
                        Previous
                    </button>
                    <button
                        onClick={handleNext}
                        className="flex items-center gap-2 px-4 py-2 text-blue-500 hover:text-blue-600"
                    >
                        Next
                        <BiRightArrowAlt className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StudyMode;
