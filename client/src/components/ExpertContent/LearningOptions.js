import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BiBook, BiNotepad, BiTestTube, BiTime, BiTrophy, BiUser } from 'react-icons/bi'

const LearningOptions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedItems } = location.state || { selectedItems: [] };
  const [activeOption, setActiveOption] = useState(null);

  const options = [
    {
      title: "Flash Cards",
      icon: <BiNotepad className="w-12 h-12 mb-4 text-blue-600" />,
      description: "Master concepts through spaced repetition",
      stats: {
        users: "2.5k+",
        time: "15-20 min",
        completion: "87%"
      },
      features: ["Personalized deck creation", "Progress tracking", "Smart review system"],
      route: "/flash-cards"
    },
    {
      title: "Test Series",
      icon: <BiTestTube className="w-12 h-12 mb-4 text-blue-600" />,
      description: "Evaluate your knowledge with realistic practice tests",
      stats: {
        users: "1.8k+",
        time: "45-60 min",
        completion: "92%"
      },
      features: ["Timed assessments", "Detailed analytics", "Performance comparison"],
      route: "/practice-tests"
    },
    {
      title: "Course Guide",
      icon: <BiBook className="w-12 h-12 mb-4 text-blue-600" />,
      description: "Comprehensive study materials with expert insights",
      stats: {
        users: "3k+",
        time: "30-40 min",
        completion: "78%"
      },
      features: ["Expert-curated content", "Interactive exercises", "Real-world examples"],
      route: "/course-guide"
    }
  ];

  const handleOptionClick = (option) => {
    setActiveOption(option);
    setTimeout(() => {
      navigate(option.route, { 
        state: { 
          selectedItems,
          learningMethod: option.title 
        } 
      });
    }, 300);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-2">Choose Your Learning Method</h1>
      <p className="text-gray-600 mb-6">Select the learning style that works best for you</p>
      
      <div className="grid md:grid-cols-3 gap-6">
        {options.map((option, index) => (
          <div 
            key={index} 
            className={`bg-white p-6 rounded-lg shadow-lg transition-all duration-300 
              ${activeOption === option ? 'scale-95 bg-blue-50' : 'hover:shadow-xl hover:-translate-y-1'}`}
            onClick={() => handleOptionClick(option)}
          >
            <div className="text-center mb-4">
              {option.icon}
              <h2 className="text-xl font-bold mb-2">{option.title}</h2>
              <p className="text-gray-600 mb-4">{option.description}</p>
            </div>

            <div className="flex justify-between text-sm text-gray-500 mb-4">
              <span className="flex items-center"><BiUser className="mr-1" /> {option.stats.users}</span>
              <span className="flex items-center"><BiTime className="mr-1" /> {option.stats.time}</span>
              <span className="flex items-center"><BiTrophy className="mr-1" /> {option.stats.completion}</span>
            </div>

            <div className="border-t pt-4">
              <ul className="text-sm space-y-2">
                {option.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LearningOptions
