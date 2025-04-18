import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';

const Conform = () => {
  const [range, setRange] = useState({ start: 1, end: 40 });
  const [questionDensity, setQuestionDensity] = useState('low');
  const [includeImages, setIncludeImages] = useState(false);
  const [questionTypes, setQuestionTypes] = useState({
    standard: { multipleChoice: false, freeResponse: false },
    case: { multipleChoice: false, freeResponse: false },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flashcardName, setFlashcardName] = useState('');

  const handleRangeChange = (e) => {
    const { name, value } = e.target;
    setRange((prevRange) => ({
      ...prevRange,
      [name]: Math.max(1, Math.min(40, Number(value))),
    }));
  };

  const handleQuestionDensityChange = (density) => {
    setQuestionDensity(density);
  };

  const handleCheckboxChange = (category, type) => {
    setQuestionTypes((prevTypes) => ({
      ...prevTypes,
      [category]: {
        ...prevTypes[category],
        [type]: !prevTypes[category][type],
      },
    }));
  };

  const handleGenerateClick = () => {
    setIsModalOpen(true);
  };

  const handleSaveFlashcard = () => {
    if (flashcardName.trim()) {
      // Here you can add logic to save the flashcard with the given name
      console.log('Saving flashcard:', flashcardName);
      setIsModalOpen(false);
      setFlashcardName('');
      // Add navigation or further processing here
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-[#175773] text-white p-6 text-center">
          <h1 className="text-2xl font-bold mb-2">react-beginners-handbook</h1>
          <p className="text-gray-200">Configure your learning experience</p>
        </div>

        <div className="p-6 space-y-8">
          {/* Page Range Selection */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="block mb-3 font-semibold text-gray-700">Select page range (max 40 pages)</label>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="text-sm text-gray-600">Start Page</label>
                <input
                  type="number"
                  name="start"
                  value={range.start}
                  onChange={handleRangeChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#175773] focus:border-transparent"
                  min="1"
                  max="40"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm text-gray-600">End Page</label>
                <input
                  type="number"
                  name="end"
                  value={range.end}
                  onChange={handleRangeChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#175773] focus:border-transparent"
                  min="1"
                  max="40"
                />
              </div>
            </div>
          </div>

          {/* Question Density */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="block mb-3 font-semibold text-gray-700">Question Density</label>
            <div className="flex space-x-3">
              {['low', 'med', 'high'].map((density) => (
                <button
                  key={density}
                  onClick={() => handleQuestionDensityChange(density)}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                    questionDensity === density
                      ? 'bg-[#349D69] text-white'
                      : 'bg-white border border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {density.charAt(0).toUpperCase() + density.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Image Options */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="flex items-center mb-3 font-semibold text-gray-700">
              <input
                type="checkbox"
                checked={includeImages}
                onChange={() => setIncludeImages(!includeImages)}
                className="w-4 h-4 mr-2 accent-[#349D69]"
              />
              Include Diagram Questions
              <Tooltip id="diagram-tooltip" className="ml-2 text-gray-500 cursor-help">ⓘ</Tooltip>
            </label>
            <button className="w-full p-2 bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed">
              Select Images (Limit: 5)
            </button>
          </div>

          {/* Question Types */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="font-semibold text-gray-700 mb-4">Question Types</h2>
            
            {/* Standard Questions */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-2">Standard Questions</h3>
              <div className="space-y-2">
                {['Multiple Choice', 'Free Response'].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={questionTypes.standard[type.toLowerCase().replace(' ', '')]}
                      onChange={() => handleCheckboxChange('standard', type.toLowerCase().replace(' ', ''))}
                      className="w-4 h-4 mr-2 accent-[#349D69]"
                    />
                    <span className="text-gray-600">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Case Questions */}
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Case Questions</h3>
              <div className="space-y-2">
                {['Multiple Choice', 'Free Response'].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={questionTypes.case[type.toLowerCase().replace(' ', '')]}
                      onChange={() => handleCheckboxChange('case', type.toLowerCase().replace(' ', ''))}
                      className="w-4 h-4 mr-2 accent-[#349D69]"
                    />
                    <span className="text-gray-600">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <button 
            onClick={handleGenerateClick}
            className="w-full py-3 bg-[#349D69] text-white rounded-lg hover:bg-[#175773] transition-colors font-semibold"
          >
            Generate Questions
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-[90%]">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Name Your Flashcard Set</h2>
            <input
              type="text"
              value={flashcardName}
              onChange={(e) => setFlashcardName(e.target.value)}
              placeholder="Enter flashcard set name"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-[#175773] focus:border-transparent"
            />
            <div className="flex space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveFlashcard}
                className="flex-1 py-2 bg-[#349D69] text-white rounded-lg hover:bg-[#175773] transition-colors"
              >
                Save & Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Conform;
