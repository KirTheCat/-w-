import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Container, FormControlLabel, Switch, Tooltip, Typography} from "@mui/material";
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
  const [isEditable, setIsEditable] = useState(true);

  const handleRemoveCharacter = index => {
    dispatch(removeUser(index));
  };

  const handleEditCharacter = index => {
    const character = characters[index];
    setEditingIndex(index);
    setEditingCharacter(character);
  };

  const handleEditSubmit = character => {
    dispatch(updateUser({ index: editingIndex, user: character }));
    setEditingIndex(null);
    setEditingCharacter({ name: '', last_name: '', email: '' });
  };

  const handleSubmit = character => {
    dispatch(addUser(character));
  };

  const handleFieldClick = (index, field) => {
    setEditableField({ index, field });
  };

  const handleFieldChange = (e, index, field) => {
    dispatch(updateUser({ index, user: {...characters[index],[field]: e.target.value}}));
  };

  const toggleView = () => {
    setView(view === 'table' ? 'cards' : 'table');
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
              <Tooltip title="Просматривайте таблицу в виде карточек" placement="top-start">
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
                  style={{ userSelect: 'none'}}
              />
              </Tooltip>

              <Tooltip title="Позволяет редактировать поля таблицы напрямую" placement="bottom-start">
              <FormControlLabel
                  control={
                    <Switch
                        checked={isEditable}
                        onChange={toggleEditable}
                        name="editableSwitch"
                        color="primary"
                        disabled={view === 'cards'}
                    />
                  }
                  label={isEditable ? 'Редактирование включено' : 'Редактирование отключено'}
                  style={{ userSelect: 'none', display: view === 'cards' ? 'none' : 'block' }}
              />
            </Tooltip>

              {view === 'table' ? (
                  <TableComponent
                      characterData={characters}
                      removeCharacter={handleRemoveCharacter}
                      // changeCharacter={handleEditCharacter}
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
