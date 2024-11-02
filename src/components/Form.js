import React, { useState, useEffect } from 'react';
import {Button, Container, TextField} from "@mui/material";

const Form = (props) => {
    const initialState = {
        name: '',
        last_name: '',
        email: ''
    };

    const [formState, setFormState] = useState(initialState);

    useEffect(() => {
        if (props.character) {
            setFormState(props.character);
        }
    }, [props.character]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        props.handleSubmit(formState);
        setFormState(initialState);
    };

    const { name, last_name, email } = formState;

    return (
        <Container
            component="main"
            maxWidth="xs"
            sx={{ width: '300px', padding: '1rem' }}
        >
            <form onSubmit={onFormSubmit}>

                <TextField
                    type="text"
                    label="Имя"
                    name="name"
                    id="name"
                    value={name}
                    fullWidth
                    required
                    variant="outlined"
                    onChange={handleChange}
                />
                <TextField
                    type="text"
                    label="Фамилия"
                    name="last_name"
                    id="last_name"
                    value={last_name}
                    fullWidth
                    required
                    variant="outlined"
                    onChange={handleChange}
                />
                <TextField
                    type="email"
                    name="email"
                    label="Эл.почта"
                    id="email"
                    value={email}
                    fullWidth
                    required
                    variant="outlined"
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="customPurple"
                    fullWidth
                >
                    Подтвердить
                </Button>
            </form>
        </Container>

    );
};

export default Form;