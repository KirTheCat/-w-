import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Form from './Form';
import TableComponent from './TableComponent';
import { Container, FormControlLabel, Switch, Typography } from "@mui/material";
import CardContainer from './CardContainer';
import { addUser, removeUser, updateUser } from "../redux/actions/UserActions";

const Home = () => {
  const characters = useSelector(state => state.userState.users);
  const dispatch = useDispatch();
  const [view, setView] = useState('table');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingCharacter, setEditingCharacter] = useState({ name: '', last_name: '', email: '' });
  const isAuthenticated = useSelector((state) => state.authState.isAuthenticated);

  const handleRemoveCharacter = index => {
    dispatch(removeUser(index));
  };

  const handleEditCharacter = index => {
    const character = characters[index];
    setEditingIndex(index);
    setEditingCharacter(character);
  };

  const handleEditSubmit = character => {
    dispatch(updateUser(editingIndex, character));
    setEditingIndex(null);
    setEditingCharacter({ name: '', last_name: '', email: '' });
  };

  const handleSubmit = character => {
    dispatch(addUser(character));
  };

  const toggleView = () => {
    setView(view === 'table' ? 'cards' : 'table');
  };

  return (
      <Container>
        {isAuthenticated ? (
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
                      removeCharacter={handleRemoveCharacter}
                      changeCharacter={handleEditCharacter}
                  />
              ) : (
                  <CardContainer
                      characters={characters}
                      removeCharacter={handleRemoveCharacter}
                      changeCharacter={handleEditCharacter}
                  />
              )}
            </div>
        ) : (
            <Typography variant="h6">Для просмотра содержимого требуется авторизация</Typography>
        )}
      </Container>
  );
};

export default Home;