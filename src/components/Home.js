import React, { useState } from 'react';
import Form from './Form';
import TableComponent from './TableComponent';
import UserCard from './UserCard';

const Home = () => {
    const [characters, setCharacters] = useState([
        {name: 'Иван', last_name: 'Петров', email: 'i_Petrov@example.com'},
        {name: 'Петр', last_name: 'Иванов', email: 'P_Ivanov@example.com'},
        {name: 'Марк', last_name: 'Аврээлиев', email: 'MarkusBigDick_23@example.com'}
    ]);
    const [view, setView] = useState('table');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingCharacter, setEditingCharacter] = useState({ name: '', last_name: '', email: '' });

    const removeCharacter = index => {
        setCharacters(characters.filter((_, i) => i !== index));
    };

    const changeCharacter = index => {
        setEditingIndex(index);
        setEditingCharacter({ ...characters[index] });
    };

    const handleEditSubmit = character => {
        const updatedCharacters = [...characters];
        updatedCharacters[editingIndex] = character;
        setCharacters(updatedCharacters);
        setEditingIndex(null);
        setEditingCharacter({ name: '', last_name: '', email: '' });
    };

    const handleSubmit = character => {
        setCharacters([...characters, character]);
    };

    const toggleView = () => {
        setView(view === 'table' ? 'cards' : 'table');
    };

    return (
        <div className="container">
            <button onClick={toggleView}>
                {view === 'table' ? 'Показать карточки' : 'Показать таблицу'}
            </button>

            <Form
                handleSubmit={editingIndex !== null ? handleEditSubmit : handleSubmit}
                character={editingCharacter}
            />

            {view === 'table' ? (
                <TableComponent
                    characterData={characters}
                    removeCharacter={removeCharacter}
                    changeCharacter={changeCharacter}
                />
            ) : (
                <div className="card-container">
                    {characters.map((character, index) => (
                        <UserCard
                            key={index}
                            user={character}
                            index={index}
                            removeCharacter={() => removeCharacter(index)}
                            changeCharacter={() => changeCharacter(index)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;
