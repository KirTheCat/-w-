import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const UserCard = ({ user, index, removeCharacter, changeCharacter }) => {
  const isEven = index % 2 === 0;
  const cardStyle = {
    margin: '10px',
    width: '300px',
    backgroundColor: isEven ? '#DCDCDC' : '#FFFAFA',
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
        <Button variant="contained" color="Gray" onClick={removeCharacter}>
        ❌
        </Button>
        <Button variant="contained" color="Gray" onClick={changeCharacter}>
        ✏️
        </Button>
      </CardContent>
    </Card>
  );
}

export default UserCard;
