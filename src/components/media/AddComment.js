import React from 'react';
import {Box, TextField, Button, Rating, Typography} from '@mui/material';
import useMedia from '../../hooks/useMedia';

const AddComment = ({ mediaId, onCommentAdded }) => {
    const { text, setText, rating, setRating, handleSubmit } = useMedia();

    return (
                <Box component="form" onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(mediaId, onCommentAdded);
                }} sx={{ marginTop: 2 }}>
                    <TextField
                        label="Ваш комментарий"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                        <Typography variant="body1" sx={{ marginRight: 2 }}>Ваш рейтинг:</Typography>
                        <Rating
                            value={rating}
                            onChange={(e, newValue) => setRating(newValue)}
                            max={5}
                            size="large"
                        />
                    </Box>
                    <Button type="submit" variant="contained" color="primary">Оставить комментарий</Button>
                </Box>

    );
};


export default AddComment;
