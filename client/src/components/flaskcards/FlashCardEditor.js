import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { BiSave, BiX } from 'react-icons/bi';

function FlashCardEditor({ onSave, onCancel, initialData }) {
    const [card, setCard] = useState({
        question: initialData?.question || '',
        answer: initialData?.answer || ''
    });

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'color', 'background',
        'list', 'bullet',
        'link'
    ];

    const handleSave = () => {
        if (card.question.trim() && card.answer.trim()) {
            onSave(card);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Question
                    </label>
                    <ReactQuill 
                        value={card.question}
                        onChange={(value) => setCard(prev => ({ ...prev, question: value }))}
                        modules={modules}
                        formats={formats}
                        className="bg-white"
                        style={{ height: '150px', marginBottom: '2rem' }}
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Answer
                    </label>
                    <ReactQuill 
                        value={card.answer}
                        onChange={(value) => setCard(prev => ({ ...prev, answer: value }))}
                        modules={modules}
                        formats={formats}
                        className="bg-white"
                        style={{ height: '200px', marginBottom: '2rem' }}
                    />
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
                <button
                    onClick={onCancel}
                    className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                    <BiX className="w-5 h-5 mr-1" />
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    className="flex items-center px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    <BiSave className="w-5 h-5 mr-1" />
                    Save Card
                </button>
            </div>
        </div>
    );
}

export default FlashCardEditor;
