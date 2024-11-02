import React from 'react';
import Grid from '@mui/material/Grid2'; // Это новый Grid2
import UserCard from './UserCard';

const CardContainer = (props) => {
    return (
        <Grid container spacing={2}>
            {props.characters.map((character, index) => (
                <Grid xs={12} sm={8} md={40} lg={3} key={index}>
                    <UserCard
                        user={character}
                        index={index}
                        removeCharacter={() => props.removeCharacter(index)}
                        changeCharacter={() => props.changeCharacter(index)}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default CardContainer;