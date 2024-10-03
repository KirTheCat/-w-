import React, { useState } from 'react';

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

export default Table;