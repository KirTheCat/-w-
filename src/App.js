import React, { Component } from 'react';
import Form from './Form';
import UserCard from './UserCard';
import Table from './Table';

class App extends Component {
    state = {
        characters: [
            { name: 'Иван', last_name: 'Петров', email: 'i_Petrov@example.com' },
            { name: 'Петр', last_name: 'Иванов', email: 'P_Ivanov@example.com' },
            { name: 'Марк', last_name: 'Аврээлиев', email: 'MarkusBigDick_23@example.com' }
        ],
         view: 'table'
    };

    removeCharacter = index => {
        const { characters } = this.state;
    
        this.setState({
            characters: characters.filter((character, i) => i !== index)
        });
    }

    handleSubmit = character => {
        this.setState({ characters: [...this.state.characters, character] });
    }

    toggleView = () => {
      this.setState({ view: this.state.view === 'table' ? 'cards' : 'table' });
  }

    render() {
        const { characters,view } = this.state;
        
        return (
          <div className="container">
          <button onClick={this.toggleView}>
              {view === 'table' ? 'Показать карточки' : 'Показать таблицу'}
          </button>
          {view === 'table' ? (
              <Table 
                  characterData={characters} 
                  removeCharacter={this.removeCharacter} 
              />
          ) : (
              <div className="card-container">
                  {characters.map((character, index) => (
                      <UserCard 
                          key={index} 
                          user={character} 
                          removeCharacter={() => this.removeCharacter(index)} 
                      />
                  ))}
              </div>
          )}
          <Form handleSubmit={this.handleSubmit} />
      </div>
        );
    }
}

export default App;
