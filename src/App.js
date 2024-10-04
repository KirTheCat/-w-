import React, { Component } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Form from './components/Form';
import UserCard from './components/UserCard';
import TableComponent from './components/Table';


const theme = createTheme();

class App extends Component {
    state = {
        characters: [
            { name: 'Иван', last_name: 'Петров', email: 'i_Petrov@example.com' },
            { name: 'Петр', last_name: 'Иванов', email: 'P_Ivanov@example.com' },
            { name: 'Марк', last_name: 'Аврээлиев', email: 'MarkusBigDick_23@example.com' }
        ],
        view: 'table',
        editingIndex: null,
        editingCharacter: { name: '', last_name: '', email: '' }
    };

    removeCharacter = index => {
        const { characters } = this.state;
        this.setState({
            characters: characters.filter((character, i) => i !== index)
        });
    }

    changeCharacter = index => {
        this.setState({
            editingIndex: index,
            editingCharacter: { ...this.state.characters[index] }
        });
    }

    handleEditSubmit = character => {
        const { characters, editingIndex } = this.state;
        characters[editingIndex] = character;
        this.setState({ characters, editingIndex: null, editingCharacter: { name: '', last_name: '', email: '' } });
    }

    handleSubmit = character => {
        this.setState({ characters: [...this.state.characters, character] });
    }

    toggleView = () => {
        this.setState({ view: this.state.view === 'table' ? 'cards' : 'table' });
    }

    render() {
        const { characters, view, editingIndex, editingCharacter } = this.state;

        return (
            <ThemeProvider theme={theme}>
                <div className="container">

                    <button onClick={this.toggleView}>
                        {view === 'table' ? 'Показать карточки' : 'Показать таблицу'}
                    </button>

                    <Form 
                        handleSubmit={editingIndex !== null ? this.handleEditSubmit : this.handleSubmit} 
                        character={editingCharacter} 
                    />

                    {view === 'table' ? (
                        <TableComponent
                            characterData={characters} 
                            removeCharacter={this.removeCharacter} 
                            changeCharacter={this.changeCharacter} 
                        />
                    ) : (
                        <div className="card-container">
                            {characters.map((character, index) => (
                                <UserCard 
                                    key={index} 
                                    user={character} 
                                    index={index}
                                    removeCharacter={() => this.removeCharacter(index)}
                                    changeCharacter={() => this.changeCharacter(index)} 
                                />
                            ))}
                        </div>
                    )}
                    
                </div>
            </ThemeProvider>
        );
    }
}

export default App;
