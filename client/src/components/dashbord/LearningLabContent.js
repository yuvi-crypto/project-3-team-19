import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiCloudUpload, BiFile, BiX, BiCheck, BiTime, BiBook, BiBarChart } from 'react-icons/bi';
import LoadingOverlay from '../common/LoadingOverlay';

function LearningLabContent() {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [uploadStatus, setUploadStatus] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const fileInputRef = useRef(null);
    
    // Add state for learning history
    const [learningHistory] = useState([
        {
            id: 1,
            title: "JavaScript Fundamentals",
            date: "2024-01-15",
            score: 85,
            questionsCount: 25,
            timeSpent: "45 min"
        },
        {
            id: 2,
            title: "React Hooks",
            date: "2024-01-14",
            score: 92,
            questionsCount: 30,
            timeSpent: "35 min"
        },
        {
            id: 3,
            title: "CSS Grid & Flexbox",
            date: "2024-01-13",
            score: 78,
            questionsCount: 20,
            timeSpent: "30 min"
        }
    ]);

    const handleDragEnter = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        handleFileSelect(droppedFile);
    };

    const handleUpload = async () => {
        setIsGenerating(true);
        try {
            const token = localStorage.getItem("token"); // Retrieve the user's token
            if (!file) {
                console.error('No file selected.');
                return;
            }
    
            const formData = new FormData();
            formData.append('generation_type', 'questions'); // Set generation type to "questions"
            formData.append('count', '20'); // Example count of questions to generate
            formData.append('file', file); // Append the uploaded file
    
            // Debug log to verify formData contents
            for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }
    
            const uploadResponse = await fetch('http://localhost:8000/api/v1/upload/file', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token
                },
                body: formData, // No need to set Content-Type manually
            });
    
            if (!uploadResponse.ok) {
                const errData = await uploadResponse.json();
                console.error('Failed to upload file:', uploadResponse.status, errData);
                setUploadStatus('error');
                return;
            }
    
            const uploadResult = await uploadResponse.json();
            console.log('File uploaded successfully:', uploadResult);
    
            // Navigate to the practice test page with generated questions
            const confirmed = window.confirm(`Questions have been generated successfully! Would you like to view them now?`);
            if (confirmed) {
                navigate(`/practice-test/${uploadResult.id}`, {
                    state: { questions: uploadResult.questions }, // Pass generated questions to the next page
                });
            }
    
            setFile(null);
            setUploadStatus('');
        } catch (error) {
            console.error('Upload failed:', error);
            setUploadStatus('error');
        } finally {
            setIsGenerating(false);
        }
    };

    const isValidFileType = (file) => {
        const validTypes = ['application/pdf', 'text/plain', 'application/msword', 
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        return validTypes.includes(file.type);
    };

    const handleFileSelect = (selectedFile) => {
        if (selectedFile && isValidFileType(selectedFile)) {
            setFile(selectedFile);
            setUploadStatus('success');
        } else {
            setUploadStatus('error');
            setTimeout(() => setUploadStatus(''), 3000); // Clear the error message after 3 seconds
        }
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            {isGenerating && (
                <LoadingOverlay message="Analyzing content and generating questions..." />
            )}

            {/* File Upload Section */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800">Generate Practice Test</h2>
                
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-semibold mb-3">Upload Your Study Material</h3>
                    <p className="text-gray-600">Upload your notes or textbook to generate custom practice questions</p>
                </div>

                {/* Upload Zone */}
                <div
                    onDragEnter={handleDragEnter}
                    onDragOver={(e) => e.preventDefault()}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`
                        border-3 border-dashed rounded-xl p-10 transition-all duration-300
                        ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
                        ${file ? 'bg-green-50 border-green-300' : ''}
                    `}
                >
                    <div className="text-center space-y-4">
                        <BiCloudUpload className={`w-16 h-16 mx-auto ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
                        <div className="space-y-2">
                            <p className="text-lg font-medium">
                                {file ? file.name : 'Drag & Drop your file here'}
                            </p>
                            <p className="text-sm text-gray-500">
                                or
                            </p>
                            <button
                                onClick={() => fileInputRef.current.click()}
                                className="text-blue-500 hover:text-blue-600 font-medium"
                            >
                                Browse files
                            </button>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={(e) => handleFileSelect(e.target.files[0])}
                            className="hidden"
                            accept=".pdf,.doc,.docx,.txt"
                        />
                        <p className="text-sm text-gray-500">
                            Supported formats: PDF, DOC, DOCX, TXT
                        </p>
                    </div>
                </div>

                {/* Status Messages */}
                {uploadStatus === 'error' && (
                    <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center">
                        <BiX className="w-5 h-5 mr-2" />
                        Invalid file type. Please upload a supported format.
                    </div>
                )}
                {uploadStatus === 'uploading' && (
                    <div className="mt-4 p-3 bg-blue-100 text-blue-700 rounded-lg flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-700 mr-2"></div>
                        Uploading file...
                    </div>
                )}
                {uploadStatus === 'success' && file && (
                    <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center">
                        <BiCheck className="w-5 h-5 mr-2" />
                        File ready for processing!
                    </div>
                )}

                {/* Action Buttons */}
                {file && (
                    <div className="mt-6 flex justify-end gap-4">
                        <button
                            onClick={() => setFile(null)}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleUpload}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
                        >
                            <BiCloudUpload className="w-5 h-5" />
                            Generate Practice Test
                        </button>
                    </div>
                )}
            </div>

            {/* Previous Learning Section */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-6">Previous Learning Sessions</h3>
                <div className="space-y-4">
                    {learningHistory.map((session) => (
                        <div 
                            key={session.id} 
                            className="border rounded-lg p-4 hover:shadow-md transition-all"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h4 className="font-medium text-lg text-gray-800">
                                        {session.title}
                                    </h4>
                                    <p className="text-sm text-gray-500 flex items-center gap-2">
                                        <BiTime className="w-4 h-4" />
                                        {session.date}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-semibold text-blue-600">
                                        {session.score}%
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-6 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <BiBook className="w-4 h-4" />
                                    {session.questionsCount} questions
                                </div>
                                <div className="flex items-center gap-1">
                                    <BiTime className="w-4 h-4" />
                                    {session.timeSpent}
                                </div>
                                <div className="flex-1">
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-blue-500 h-2 rounded-full"
                                            style={{ width: `${session.score}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Performance Overview */}
                <div className="mt-8 grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 text-blue-600 mb-2">
                            <BiBarChart className="w-5 h-5" />
                            <span className="font-medium">Average Score</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-700">
                            {Math.round(learningHistory.reduce((acc, curr) => acc + curr.score, 0) / learningHistory.length)}%
                        </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 text-green-600 mb-2">
                            <BiBook className="w-5 h-5" />
                            <span className="font-medium">Total Questions</span>
                        </div>
                        <div className="text-2xl font-bold text-green-700">
                            {learningHistory.reduce((acc, curr) => acc + curr.questionsCount, 0)}
                        </div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 text-purple-600 mb-2">
                            <BiTime className="w-5 h-5" />
                            <span className="font-medium">Total Time</span>
                        </div>
                        <div className="text-2xl font-bold text-purple-700">
                            {Math.round(learningHistory.reduce((acc, curr) => acc + parseInt(curr.timeSpent), 0))} min
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LearningLabContent;