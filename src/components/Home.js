import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Home = () => {
  const characters = useSelector(state => state.users);
  const dispatch = useDispatch();

  const removeCharacter = index => {
    dispatch({ type: 'REMOVE_USER', payload: index });
  };

  const changeCharacter = index => {
    const character = characters[index];
    dispatch({ type: 'UPDATE_USER', payload: { index, user: character } });
  };

  const handleEditSubmit = character => {
    dispatch({ type: 'UPDATE_USER', payload: { index: editingIndex, user: character } });
  };

  const handleSubmit = character => {
    dispatch({ type: 'ADD_USER', payload: character });
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
