import React, { useState } from 'react';
import { Box, TextField, Button, Rating, Typography } from '@mui/material';
import instance from "../../config/axios";

const AddComment = ({ mediaId, onCommentAdded }) => {
    const [text, setText] = useState('');
    const [rating, setRating] = useState(0);

    const ratingValueToEnum = {
        0: "ZERO_STAR",
        1: "ONE_STAR",
        2: "TWO_STARS",
        3: "THREE_STARS",
        4: "FOUR_STARS",
        5: "FIVE_STARS",
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const comment = {
            text,
            rating: ratingValueToEnum[rating]
        };

        try {
            await instance.post(`/media/${mediaId}/add_review`, comment);
            setText('');
            setRating(0);
            onCommentAdded();
        } catch (error) {
            console.error("Ошибка при добавлении комментария:", error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: 2 }}>
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
