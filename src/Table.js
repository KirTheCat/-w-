import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const TableHeader = () => { 
    return (
        <thead>
            <tr>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Email</th>
            </tr>
        </thead>
    );
}

const TableBody = props => { 
    const rows = props.characterData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.name}</td>
                <td>{row.last_name}</td>
                <td>{row.email}</td>
                <td><button onClick={() => props.removeCharacter(index)}>Удалить</button></td>
            </tr>
        );
    });

    return <tbody>{rows}</tbody>;
}

const Table = (props) => {
    const { characterData, removeCharacter } = props;
    return (
        <table>
            <TableHeader />
            <TableBody characterData={characterData} removeCharacter={removeCharacter} />
        </table>
    );
}

const UserCard = ({ user }) => {
  return (
    <Card style={{ margin: '10px', width: '300px' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {user.firstName} {user.lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.email}
        </Typography>
      </CardContent>
    </Card>
  );
}

const App = () => {
    const [isTable, setIsTable] = useState(true);
    const characterData = [
        { name: 'Иван', last_name: 'Петров', email: 'I_petrov@example.com' },
        { name: 'Петр', last_name: 'Иванов', email: 'P_ivanov@example.com' },
    ];

    const removeCharacter = (index) => {
        const newCharacterData = characterData.filter((_, i) => i !== index);
    };

    return (
        <div>
            <button onClick={() => setIsTable(!isTable)}>
                {isTable ? 'Показать карточки' : 'Показать таблицу'}
            </button>
            {isTable ? (
                <Table characterData={characterData} removeCharacter={removeCharacter} />
            ) : (
                <div>
                    {characterData.map((user, index) => (
                        <UserCard key={index} user={user} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;