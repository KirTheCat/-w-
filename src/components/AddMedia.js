import React, { useState } from 'react';
import { IconButton, Dialog, DialogTitle, DialogContent, TextField, Button, Select, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AddMediaButton = ({ onMediaAdded }) => {
    const [open, setOpen] = useState(false);
    const [newMedia, setNewMedia] = useState({
        title: '',
        genre: '',
        director: '',
        releaseYear: '',
        type: 'movie',
        durationInMinutes: '',
        episodes: ''
    });
    const [error, setError] = useState(null);

    const authState = useSelector((state) => state.authState);
    const isAdmin = authState?.user?.role === 'ROLE_ADMIN';

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setNewMedia({
            ...newMedia,
            [event.target.name]: event.target.value
        });
    };

    const handleAddMedia = () => {
        const mediaData = { ...newMedia };

        if (newMedia.type === 'movie') {
            mediaData.durationInMinutes = parseInt(newMedia.durationInMinutes, 10);
            delete mediaData.episodes;
        } else if (newMedia.type === 'series') {
            mediaData.episodes = parseInt(newMedia.episodes, 10);
            delete mediaData.durationInMinutes;
        }

        axios.post('http://localhost:8081/media', mediaData)
            .then(response => {
                onMediaAdded(response.data);
                handleClose();
            })
            .catch(error => {
                setError(error.message);
            });
    };

    if (!isAdmin) {
        return null;
    }

    return (
        <>
            <IconButton onClick={handleClickOpen} sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000 }}>
                <AddIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Добавить новое медиа</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="title"
                        label="Название"
                        type="text"
                        fullWidth
                        value={newMedia.title}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="genre"
                        label="Жанр"
                        type="text"
                        fullWidth
                        value={newMedia.genre}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="director"
                        label="Режиссёр"
                        type="text"
                        fullWidth
                        value={newMedia.director}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="releaseYear"
                        label="Год Выхода"
                        type="number"
                        fullWidth
                        value={newMedia.releaseYear}
                        onChange={handleChange}
                    />
                    <Select
                        name="type"
                        value={newMedia.type}
                        onChange={handleChange}
                        fullWidth
                        sx={{ margin: '16px 0' }}
                    >
                        <MenuItem value="movie">Фильм</MenuItem>
                        <MenuItem value="series">Сериал</MenuItem>
                    </Select>
                    {newMedia.type === 'movie' && (
                        <TextField
                            margin="dense"
                            name="durationInMinutes"
                            label="Продолжительность (минуты)"
                            type="number"
                            fullWidth
                            value={newMedia.durationInMinutes}
                            onChange={handleChange}
                        />
                    )}
                    {newMedia.type === 'series' && (
                        <TextField
                            margin="dense"
                            name="episodes"
                            label="Количество серий"
                            type="number"
                            fullWidth
                            value={newMedia.episodes}
                            onChange={handleChange}
                        />
                    )}
                    <Button onClick={handleAddMedia} color="primary" variant="contained" sx={{ marginTop: 2 }}>
                        Добавить
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AddMediaButton;
