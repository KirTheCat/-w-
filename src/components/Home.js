import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, FormControlLabel, Switch, Typography } from "@mui/material";
import Form from './Form';
import TableComponent from './TableComponent';
import CardContainer from './CardContainer';
import { addUser, removeUser, updateUser } from "../redux/slicers/userSlice";

const Home = () => {
  const characters = useSelector(state => state.userState.users);
  const dispatch = useDispatch();
  const [view, setView] = useState('table');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingCharacter, setEditingCharacter] = useState({ name: '', last_name: '', email: '' });
  const isAuthenticated = useSelector(state => state.authState.isAuthenticated);
  const [editableField, setEditableField] = useState({ index: null, field: '' });
  const [isEditable, setIsEditable] = useState(true); // Добавлено: переключатель режима редактирования

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

  const handleFieldClick = (index, field) => {
    setEditableField({ index, field });
  };

  const handleFieldChange = (e, index, field) => {
    const newCharacter = { ...characters[index], [field]: e.target.value };
    dispatch(updateUser(index, newCharacter));
  };

  const toggleEditable = () => {
    setIsEditable(!isEditable);
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
              <FormControlLabel
                  control={
                    <Switch
                        checked={isEditable}
                        onChange={toggleEditable}
                        name="editableSwitch"
                        color="primary"
                    />
                  }
                  label={isEditable ? 'Редактирование включено' : 'Редактирование отключено'}
              />
              {view === 'table' ? (
                  <TableComponent
                      characterData={characters}
                      removeCharacter={handleRemoveCharacter}
                      changeCharacter={handleEditCharacter}
                      handleFieldClick={isEditable ? handleFieldClick : () => {}}
                      handleFieldChange={handleFieldChange}
                      editableField={editableField}
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
