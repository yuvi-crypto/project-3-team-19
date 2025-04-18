import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Selection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = location.state?.query || '';
  const [selectedItems, setSelectedItems] = useState([]);

  const examCategories = [
    "Engineering Mathematics",
    "Digital Logic",
    "Computer Organization and Architecture",
    "Programming and Data Structures",
    "Algorithms",
    "Theory of Computation",
    "Compiler Design",
    "Operating System",
    "Databases",
    "Computer Networks",  
];

  const handleCheckboxChange = (category) => {
    setSelectedItems(prev => 
      prev.includes(category)
        ? prev.filter(item => item !== category)
        : [...prev, category]
    );
  };

  const handleContinue = () => {
    navigate('/learning-options', { state: { selectedItems } });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Select Your Topic</h1>
      <p className="text-gray-600 mb-6">You searched for: {searchQuery}</p>
      
      <div className="space-y-4 bg-white p-6 rounded-lg shadow">
        {examCategories.map((category, index) => (
          <div key={index} className="flex items-center">
            <input
              type="checkbox"
              id={category}
              className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              checked={selectedItems.includes(category)}
              onChange={() => handleCheckboxChange(category)}
            />
            <label htmlFor={category} className="ml-3 text-lg text-gray-700">
              {category}
            </label>
          </div>
        ))}
      </div>

      {selectedItems.length > 0 && (
        <div className="mt-6">
          <button 
            onClick={handleContinue}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Proceed with {selectedItems.length} selected
          </button>
        </div>
      )}
    </div>
  )
}

export default Selection