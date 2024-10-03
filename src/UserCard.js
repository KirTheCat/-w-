import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const UserCard = ({ user, removeCharacter }) => {
  return (
    <Card style={{ margin: '10px', width: '300px' }}>
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
      </CardContent>
    </Card>
  );
}

export default UserCard;
