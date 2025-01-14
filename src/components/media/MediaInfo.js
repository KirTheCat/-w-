import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CircularProgress, Button, Rating, List } from '@mui/material';
import instance from "../../config/axios";
import Comment from './Comment';
import AddComment from './AddComment';

const MediaInfo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [media, setMedia] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [error, setError] = useState(null);

    const fetchMedia = useCallback(async () => {
        try {
            const response = await instance.get(`/media/${id}`);
            setMedia(response.data);
        } catch (error) {
            setError(error.message);
            console.error("Ошибка при получении медиа:", error);
        }
    }, [id]);

    const fetchReviews = useCallback(async () => {
        try {
            const response = await instance.get(`/media/${id}/reviews`);
            setReviews(response.data);
        } catch (error) {
            console.error("Ошибка при получении отзывов:", error);
        }
    }, [id]);

    const fetchAverageRating = useCallback(async () => {
        try {
            const response = await instance.get(`/media/${id}/average_rating`);
            const ratingString = response.data;
            const match = ratingString.match(/Средний рейтинг:\s*(\d+(\.\d+)?)/);
            const average = match ? parseFloat(match[1]) : 0;
            setAverageRating(average);
        } catch (error) {
            console.error("Ошибка при получении среднего рейтинга:", error);
        }
    }, [id]);

    useEffect(() => {
        fetchMedia();
        fetchReviews();
        fetchAverageRating();
    }, [fetchMedia, fetchReviews, fetchAverageRating]);

    if (error) {
        return <Typography color="error">Ошибка: {error}</Typography>;
    }

    if (!media) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    const handleCommentAdded = () => {
        fetchReviews();
        fetchAverageRating();
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Button variant="contained" onClick={() => navigate(-1)} sx={{ marginBottom: 2 }}>
                Вернуться
            </Button>
            <Card sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
                <CardContent>
                    <Typography variant="h4" component="h1" gutterBottom>{media.title}</Typography>
                    <Typography variant="body1" sx={{ margin: 1 }}><strong>Жанр:</strong> {media.genre}</Typography>
                    <Typography variant="body1" sx={{ margin: 1 }}><strong>Режиссёр:</strong> {media.director}</Typography>
                    <Typography variant="body1" sx={{ margin: 1 }}><strong>Год Выхода:</strong> {media.releaseYear}</Typography>
                    {media.durationInMinutes && (
                        <Typography variant="body1" sx={{ margin: 1 }}><strong>Продолжительность:</strong> {media.durationInMinutes} минут</Typography>
                    )}
                    {media.episodes && (
                        <Typography variant="body1" sx={{ margin: 1 }}><strong>Кол-во серий:</strong> {media.episodes.length}</Typography>
                    )}
                    <Box sx={{ display: 'flex', alignItems: 'center', margin: 1 }}>
                        <Typography variant="body1"><strong>Рейтинг:</strong></Typography>
                        <Rating value={averageRating} readOnly max={5} sx={{ marginLeft: 1 }} precision={0.1} />
                    </Box>
                    <Box sx={{ margin: 1 }}>
                        <Typography variant="h6">Отзывы</Typography>
                        {reviews.length > 0 ? (
                            <List>
                                {reviews.map((review, index) => (
                                    <Comment key={index} comment={review} />
                                ))}
                            </List>
                        ) : (
                            <Typography variant="body2">Отзывов пока нет.</Typography>
                        )}
                    </Box>
                    <AddComment mediaId={id} onCommentAdded={handleCommentAdded} />
                </CardContent>
            </Card>
        </Box>
    );
};

export default MediaInfo;
