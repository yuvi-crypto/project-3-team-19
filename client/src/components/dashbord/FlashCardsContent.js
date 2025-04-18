import React, { useState, useEffect } from 'react';
import { BiPlus, BiEdit, BiTrash, BiCloudUpload, BiPencil, BiFile, BiDotsVerticalRounded } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import * as pdfjsLib from 'pdfjs-dist';
function FlashCardsContent() {
    const navigate = useNavigate();
    const [newDeckName, setNewDeckName] = useState('');
    const [description, setDescription] = useState(''); // New state for description
    const [count, setCount] = useState(0); // New state for count
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [showDeckNamePrompt, setShowDeckNamePrompt] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [inputMethod, setInputMethod] = useState(null);
    const [recentDecks, setRecentDecks] = useState([]);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const inputOptions = [
        {
            id: 'manual',
            icon: <BiPencil className="w-8 h-8" />,
            title: 'Create Empty Deck',
            description: 'Create a new deck and add cards later',
        },
        {
            id: 'file',
            icon: <BiFile className="w-8 h-8" />,
            title: 'Upload File',
            description: 'Import cards from CSV or Excel file',
        },
    ];



    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setUploadedFile(file); // just store the file
            setShowDeckNamePrompt(true); // show deck prompt if needed
        } else {
            alert('Please upload a valid PDF file');
        }
    };
    
    

    const handleCreateDeck = async (e) => {
        e.preventDefault();
    
        if (!newDeckName.trim() || !description.trim() || count < 0) {
            console.error('All fields are required.');
            return;
        }
    
        try {
            // Step 1: Create the deck
            const deckPayload = {
                name: newDeckName,
                description: description,
            };
            const token = localStorage.getItem("token");
            const deckResponse = await fetch('http://localhost:8000/api/v1/decks/', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(deckPayload),
            });
    
            if (!deckResponse.ok) {
                console.error('Failed to create deck:', deckResponse.statusText);
                return;
            }
    
            const deckResult = await deckResponse.json();
            console.log('Deck created successfully:', deckResult);
    
            // Step 2: Upload the file and create flashcards
            if (uploadedFile && deckResult?.deck_id) {
                const formData = new FormData();
                formData.append('generation_type', 'flashcards'); // Hardcoded
                formData.append('deck_id', deckResult.deck_id); // Use the dynamic deck_id
                formData.append('count', count.toString()); // Ensure count is a string
                formData.append('file', uploadedFile);
    
                // Debug log
                for (let [key, value] of formData.entries()) {
                    console.log(`${key}:`, value);
                }
    
                try {
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
                        return;
                    }
    
                    const uploadResult = await uploadResponse.json();
                    console.log('File uploaded successfully:', uploadResult);
                } catch (err) {
                    console.error('Upload error:', err);
                }
            }
    
            // Step 3: Update the UI
            try {
                const flashcardsResponse = await fetch(
                    `http://localhost:8000/api/v1/tools/flashcards?deck_id=${deckResult.deck_id}&practice=false`,
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`, // Include the token
                        },
                    }
                );
    
                if (!flashcardsResponse.ok) {
                    console.error('Failed to fetch flashcards:', flashcardsResponse.statusText);
                    return;
                }
    
                const flashcardsResult = await flashcardsResponse.json();
                console.log('Flashcards fetched successfully:', flashcardsResult);
    
                // Step 4: Update the UI with the new deck and its flashcards
                setRecentDecks((prevDecks) => [
                    {
                        id: deckResult.deck_id, // Use the deck_id from the API response
                        name: newDeckName,
                        cardCount: count,
                        createdAt: new Date().toISOString().split('T')[0],
                    },
                    ...prevDecks,
                ]);
            } catch (err) {
                console.error('Error fetching flashcards:', err);
            }
    
            // Reset form state
            setNewDeckName('');
            setDescription('');
            setCount(0);
            setShowDeckNamePrompt(false);
            setInputMethod(null);
            setIsFormVisible(false);
            setUploadedFile(null);
        } catch (error) {
            console.error('Error creating deck or uploading file:', error);
        }
    };

    const handleOptionSelect = (optionId) => {
        setInputMethod(optionId);
        if (optionId === 'manual') {
            setShowDeckNamePrompt(true);
        }
    };
    useEffect(() => {
        const fetchRecentDecks = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch('http://localhost:8000/api/v1/decks/list', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'accept': 'application/json',
                    },
                });
    
                if (!response.ok) {
                    console.error('Failed to fetch recent decks:', response.statusText);
                    return;
                }
    
                const data = await response.json();
                const formattedDecks = data.map((deck) => ({
                    id: deck.id,
                    name: deck.name,
                    description: deck.description,
                    cardCount: 0, // Placeholder for now (you can fetch card count later)
                    createdAt: new Date(deck.time).toISOString().split('T')[0], // Format date
                }));
    
                setRecentDecks(formattedDecks); // Update the recentDecks state
            } catch (error) {
                console.error('Error fetching recent decks:', error);
            }
        };
    
        fetchRecentDecks();
    }, []);

    return (
        <div className="space-y-8">
            {/* Create Deck Section */}
            <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">My Decks</h2>
                    {!inputMethod && !showDeckNamePrompt && (
                        <button
                            onClick={() => setIsFormVisible(!isFormVisible)}
                            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            <BiPlus className="w-5 h-5" />
                            New Deck
                        </button>
                    )}
                </div>

                {isFormVisible && !inputMethod && !showDeckNamePrompt && (
                    <div className="grid grid-cols-2 gap-6 mt-4">
                        {inputOptions.map((option) => (
                            <div
                                key={option.id}
                                className="border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                                onClick={() => handleOptionSelect(option.id)}
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="text-blue-500 mb-3">{option.icon}</div>
                                    <h3 className="font-semibold mb-2">{option.title}</h3>
                                    <p className="text-sm text-gray-600">{option.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {inputMethod === 'file' && !showDeckNamePrompt && (
                    <div className="space-y-4">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            <BiCloudUpload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                            <input
                                type="file"
                                className="hidden"
                                id="cardFile"
                                onChange={handleFileUpload}
                                accept=".csv,.qxlsx,.xls"
                            />
                            <label
                                htmlFor="cardFile"
                                className="cursor-pointer text-blue-500 hover:text-blue-600 block mb-3"
                            >
                                Click to upload file
                            </label>
                            <p className="text-sm text-gray-500 mb-4">Support formats: CSV, Excel (.xlsx, .xls)</p>
                            <a href="#" className="text-blue-500 hover:text-blue-700 text-sm">
                                Download template file
                            </a>
                        </div>
                        <button
                            onClick={() => setInputMethod(null)}
                            className="w-full py-2 text-gray-600 hover:text-gray-800"
                        >
                            Back to options
                        </button>
                    </div>
                )}

                {showDeckNamePrompt && (
                    <div className="mt-4">
                        <form onSubmit={handleCreateDeck} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Deck Name</label>
                                <input
                                    type="text"
                                    value={newDeckName}
                                    onChange={(e) => setNewDeckName(e.target.value)}
                                    className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter deck name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter description"
                                    required
                                />
                            </div>
                            <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Card Count</label>
    <input
        type="number"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))} // Allow manual updates
        className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter card count"
        min="1" // Ensure count is at least 1
        required
    />
    {uploadedFile && (
        <p className="text-sm text-gray-500 mt-2">File selected: {uploadedFile.name}</p>
    )}
</div>

                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowDeckNamePrompt(false);
                                        setUploadedFile(null);
                                        setInputMethod(null);
                                    }}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Create Deck
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
    <h3 className="text-xl font-semibold mb-4">Recent Decks</h3>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recentDecks.length > 0 ? (
            recentDecks.map((deck) => (
                <div
                    key={deck.id}
                    onClick={(e) => {
                        if (!e.target.closest('.deck-menu')) navigate(`/deck/${deck.id}`);
                    }}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-800 hover:text-blue-600">{deck.name}</h4>
                        <div className="relative deck-menu">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveDropdown(activeDropdown === deck.id ? null : deck.id);
                                }}
                                className="p-1 hover:bg-gray-100 rounded-full"
                            >
                                <BiDotsVerticalRounded className="w-5 h-5" />
                            </button>
                            {activeDropdown === deck.id && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                                    <div className="py-1">
                                        <button
                                            onClick={() => console.log('Add Cards')}
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                        >
                                            <BiPlus className="w-4 h-4 mr-2" />
                                            Add Flash Cards
                                        </button>
                                        <button
                                            onClick={() => console.log('Rename')}
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                        >
                                            <BiEdit className="w-4 h-4 mr-2" />
                                            Rename
                                        </button>
                                        <button
                                            onClick={() => console.log('Delete')}
                                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                                        >
                                            <BiTrash className="w-4 h-4 mr-2" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{deck.cardCount} cards</p>
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">Created: {deck.createdAt}</span>
                    </div>
                </div>
            ))
        ) : (
            <p className="text-gray-500 col-span-full text-center">No recent decks available.</p>
        )}
    </div>
</div>
        </div>
    );
}

export default FlashCardsContent;