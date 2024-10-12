import React, { useState } from 'react';
import Form from './Form';
import TableComponent from './TableComponent';
import UserCard from './UserCard';
import {FormControlLabel, Switch} from "@mui/material";
import CardContainer from './CardContainer';

const Home = () => {
    const [characters, setCharacters] = useState([
        {name: 'Иван', last_name: 'Петров', email: 'i_Petrov@example.com'},
        {name: 'Петр', last_name: 'Иванов', email: 'P_Ivanov@example.com'},
        {name: 'Марк', last_name: 'Аврээлиев', email: 'MarkusBigDick_23@example.com'},
        {name: 'Геннадий', last_name: 'Цидармян', email: 'Gennius89@example.com'},
        {name: 'Дмитрий', last_name: 'Укулелеевич', email: 'Dulaboba1997@example.com'},
        {name: 'Марк', last_name: 'Карлс', email: 'Jsdc75_nagibator_23@example.com'}
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

            <Form
                handleSubmit={editingIndex !== null ? handleEditSubmit : handleSubmit}
                character={editingCharacter}
            />

            <FormControlLabel
                control={
                    <Switch
                        checked={view === 'cards'}
                        onChange={toggleView}
                        name="viewSwitch"
                        color="primary"
                    />
                }
                label={view === 'table' ? 'Показать таблицу' : 'Показать карточки'}
            />
            {view === 'table' ? (
                <TableComponent
                    characterData={characters}
                    removeCharacter={removeCharacter}
                    changeCharacter={changeCharacter}
                />
            ) : (
                <CardContainer
                    characters={characters}
                    removeCharacter={removeCharacter}
                    changeCharacter={changeCharacter}
                />
            )}
        </div>
    );
}

export default Home;
