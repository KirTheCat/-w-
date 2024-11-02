import React from 'react';
import { Card, CardContent, Typography, Button, ButtonGroup, useTheme } from '@mui/material';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import EditIcon from '@mui/icons-material/Edit';

const UserCard = ({ user, index, removeCharacter, changeCharacter }) => {
  const theme = useTheme();
  const isEven = index % 2 === 0;

  const cardStyle = {
    margin: '10px',
    width: '300px',
    backgroundColor: isEven ? theme.palette.action.hover : theme.palette.background.default,
  };

  return (
      <Card style={cardStyle}>
        <CardContent>
          <Typography variant="h5" component="div">
            {user.name} {user.last_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        </CardContent>

        <ButtonGroup fullWidth>
          <Button
              variant="contained"
              color="deleteColor"
              onClick={removeCharacter}
              startIcon={<DeleteSharpIcon />}
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            Удалить
          </Button>
          <Button
              variant="contained"
              color="editColor"
              onClick={changeCharacter}
              startIcon={<EditIcon />}
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            Изменить
          </Button>
        </ButtonGroup>
      </Card>
  );
}

export default UserCard;
