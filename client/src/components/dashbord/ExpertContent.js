import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BiCloudUpload, BiCalendar, BiTime, BiCheck } from 'react-icons/bi'

function ExpertContent() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        query: '',
        files: [],
        deadline: '',
        customDate: ''
    });

    const deadlineOptions = [
        { value: '1', label: 'Within 24 hours' },
        { value: '3', label: '3 days' },
        { value: '7', label: '1 week' },
        { value: '14', label: '2 weeks' },
        { value: '30', label: '1 month' },
        { value: 'custom', label: 'Custom date' }
    ];

    const handleQuerySubmit = (e) => {
        e.preventDefault();
        if (formData.query.trim()) {
            setCurrentStep(2);
        }
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prev => ({
            ...prev,
            files: [...prev.files, ...files]
        }));
    };

    const handleDeadlineSubmit = (e) => {
        e.preventDefault();
        if (formData.deadline) {
            const deadline = formData.deadline === 'custom' 
                ? formData.customDate
                : new Date(Date.now() + parseInt(formData.deadline) * 24 * 60 * 60 * 1000).toISOString();
            
            navigate('/selection', { 
                state: { 
                    query: formData.query,
                    files: formData.files,
                    deadline: deadline
                } 
            });
        }
    };

    const handleNext = () => {
        setCurrentStep(3);
    };

    return (
        <div className="space-y-8 max-w-2xl mx-auto">
            {/* Step Indicators */}
            <div className="flex justify-between items-center mb-8">
                {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                        <div className={`rounded-full h-8 w-8 flex items-center justify-center
                            ${step <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200'}
                        `}>
                            {step < currentStep ? <BiCheck className="w-5 h-5" /> : step}
                        </div>
                        {step < 3 && (
                            <div className={`w-24 h-1 mx-2 
                                ${step < currentStep ? 'bg-blue-500' : 'bg-gray-200'}`}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Step 1 - Always visible */}
            <div className={`transition-all duration-300 ${currentStep === 1 ? 'opacity-100' : 'opacity-70'}`}>
                <h2 className="text-2xl font-bold mb-4">What would you like to learn today?</h2>
                <form onSubmit={handleQuerySubmit}>
                    <input 
                        type='text' 
                        className='px-10 py-4 w-full rounded-full border-2 border-gray-300 focus:border-blue-500 focus:outline-none'
                        value={formData.query}
                        onChange={(e) => setFormData(prev => ({ ...prev, query: e.target.value }))}
                        placeholder="Type your topic and press Enter..."
                        disabled={currentStep !== 1}
                    />
                </form>
            </div>

            {/* Step 2 - Visible after step 1 */}
            {currentStep >= 2 && (
                <div className={`transition-all duration-300 ${currentStep === 2 ? 'opacity-100' : 'opacity-70'}`}>
                    <h2 className="text-2xl font-bold mb-4">Upload reference materials (Optional)</h2>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <BiCloudUpload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                        <input
                            type="file"
                            multiple
                            className="hidden"
                            id="fileInput"
                            onChange={handleFileChange}
                            disabled={currentStep !== 2}
                        />
                        <label 
                            htmlFor="fileInput"
                            className={`cursor-pointer text-blue-500 hover:text-blue-600 
                                ${currentStep !== 2 ? 'pointer-events-none' : ''}`}
                        >
                            Click to upload files
                        </label>
                        {formData.files.length > 0 && (
                            <div className="mt-4">
                                <p className="font-medium">Selected files:</p>
                                <ul className="text-sm text-gray-600">
                                    {formData.files.map((file, index) => (
                                        <li key={index}>{file.name}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    {currentStep === 2 && (
                        <button
                            onClick={handleNext}
                            className="w-full mt-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Continue
                        </button>
                    )}
                </div>
            )}

            {/* Step 3 - Visible after step 2 */}
            {currentStep >= 3 && (
                <div className={`transition-all duration-300 ${currentStep === 3 ? 'opacity-100' : 'opacity-70'}`}>
                    <h2 className="text-2xl font-bold mb-4">Set your deadline</h2>
                    <form onSubmit={handleDeadlineSubmit}>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                {deadlineOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        disabled={currentStep !== 3}
                                        className={`p-4 rounded-lg border-2 transition-all
                                            ${formData.deadline === option.value 
                                                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                                                : 'border-gray-200 hover:border-blue-300'}
                                            ${currentStep !== 3 ? 'opacity-70' : ''}`}
                                        onClick={() => setFormData(prev => ({ 
                                            ...prev, 
                                            deadline: option.value 
                                        }))}
                                    >
                                        <div className="flex items-center justify-center space-x-2">
                                            <BiTime className="w-5 h-5" />
                                            <span>{option.label}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {formData.deadline === 'custom' && (
                                <div className="relative">
                                    <BiCalendar className="absolute top-4 left-4 text-gray-400" />
                                    <input 
                                        type="datetime-local"
                                        className="px-10 py-4 w-full rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                                        value={formData.customDate || ''}
                                        onChange={(e) => setFormData(prev => ({ 
                                            ...prev, 
                                            customDate: e.target.value 
                                        }))}
                                        required={formData.deadline === 'custom'}
                                        min={new Date().toISOString().slice(0, 16)}
                                        disabled={currentStep !== 3}
                                    />
                                </div>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="w-full mt-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Start Learning
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ExpertContent