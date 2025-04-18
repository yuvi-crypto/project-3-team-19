import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BiPlus, BiEdit, BiTrash, BiArrowBack, BiBook } from 'react-icons/bi';
import FlashCardEditor from './FlashCardEditor';
import StudyMode from './StudyMode';

function DeckDetails() {
    const { deckId } = useParams();
    const navigate = useNavigate();
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingCard, setEditingCard] = useState(null);
    const [isStudyMode, setIsStudyMode] = useState(false);
    const [deck, setDeck] = useState({
        id: deckId,
        name: "Loading...", // Default placeholder while loading
        cards: [],
    });

    // Fetch deck details and flashcards
    useEffect(() => {
        const fetchDeckDetails = async () => {
            try {
                const token = localStorage.getItem("token");

                // Step 1: Fetch deck name using the /api/v1/decks endpoint
                const deckResponse = await fetch(
                    `http://localhost:8000/api/v1/decks/${deckId}/`,
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
 
                if (!deckResponse.ok) {
                    console.error('Failed to fetch deck details:', deckResponse.statusText);
                    setDeck((prevDeck) => ({
                        ...prevDeck,
                        name: "Unnamed Deck", // Fallback name if API fails
                    }));
                    return;
                }

                const deckData = await deckResponse.json();
                const deckName = deckData.name || "Unnamed Deck";

                // Step 2: Fetch flashcards using the /api/v1/tools/flashcards endpoint
                const flashcardsResponse = await fetch(
                    `http://localhost:8000/api/v1/tools/flashcards/?deck_id=${deckId}&practice=false`,
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!flashcardsResponse.ok) {
                    console.error('Failed to fetch flashcards:', flashcardsResponse.statusText);
                    setDeck((prevDeck) => ({
                        ...prevDeck,
                        name: deckName,
                        cards: [],
                    }));
                    return;
                }

                const flashcardsData = await flashcardsResponse.json();
                const flashcards = Array.isArray(flashcardsData) ? flashcardsData : [];

                // Update the deck state with the fetched data
                setDeck({
                    id: deckId,
                    name: deckName,
                    cards: flashcards,
                });
            } catch (error) {
                console.error('Error fetching deck details:', error);
                setDeck((prevDeck) => ({
                    ...prevDeck,
                    name: "Unnamed Deck", // Fallback name if an error occurs
                    cards: [],
                }));
            }
        };

        fetchDeckDetails();
    }, [deckId]);

    const handleCreateCard = (cardData) => {
        const newCardData = {
            id: Date.now(),
            ...cardData,
        };
        setDeck((prev) => ({
            ...prev,
            cards: [...prev.cards, newCardData],
        }));
        setShowCreateForm(false);
    };

    const handleEditCard = (cardData) => {
        setDeck((prev) => ({
            ...prev,
            cards: prev.cards.map((card) =>
                card.id === editingCard.id ? { ...card, ...cardData } : card
            ),
        }));
        setEditingCard(null);
    };

    const handleDeleteCard = (cardId) => {
        if (window.confirm('Are you sure you want to delete this card?')) {
            setDeck((prev) => ({
                ...prev,
                cards: prev.cards.filter((card) => card.id !== cardId),
            }));
        }
    };

    if (isStudyMode) {
        return (
            <StudyMode
                cards={deck.cards}
                deckName={deck.name}
                onExit={() => setIsStudyMode(false)}
            />
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                    >
                        <BiArrowBack className="w-6 h-6" />
                    </button>
                    <h2 className="text-2xl font-bold">{deck.name}</h2>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => setIsStudyMode(true)}
                        className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                        disabled={deck.cards.length === 0}
                    >
                        <BiBook className="w-5 h-5" />
                        Start Learning
                    </button>
                    <button
                        onClick={() => setShowCreateForm(true)}
                        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        <BiPlus className="w-5 h-5" />
                        Add Flash Card
                    </button>
                </div>
            </div>

            {showCreateForm ? (
                <FlashCardEditor
                    onSave={handleCreateCard}
                    onCancel={() => setShowCreateForm(false)}
                />
            ) : null}

            {editingCard ? (
                <FlashCardEditor
                    initialData={editingCard}
                    onSave={handleEditCard}
                    onCancel={() => setEditingCard(null)}
                />
            ) : null}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {deck.cards.length > 0 ? (
                    deck.cards.map((card) => (
                        <div key={card.id} className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div
                                    className="font-medium text-gray-800"
                                    dangerouslySetInnerHTML={{ __html: card.front }}
                                />
                                <div className="flex gap-2">
                                    <button
                                        className="text-blue-500 hover:text-blue-700"
                                        onClick={() => setEditingCard(card)}
                                    >
                                        <BiEdit className="w-5 h-5" />
                                    </button>
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => handleDeleteCard(card.id)}
                                    >
                                        <BiTrash className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <div
                                className="text-gray-600"
                                dangerouslySetInnerHTML={{ __html: card.back }}
                            />
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No flashcards available in this deck.</p>
                )}
            </div>
        </div>
    );
}

export default DeckDetails;