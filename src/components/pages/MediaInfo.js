import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import instance from "../../config/axios";

const MediaInfo = () => {
    const { id } = useParams();
    const [media, setMedia] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const response = await instance.get(`/media/${id}`);
                setMedia(response.data);
            } catch (error) {
                setError(error.message); // Обработка ошибки
                console.error("Ошибка при получении медиа:", error);
            }
        };

        fetchMedia();
    }, [id]);

    if (error) {
        return <Typography color="error">Error: {error}</Typography>;
    }

    if (!media) {
        return <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
        </Box>;
    }

    return (
        <Box sx={{ padding: 2 }}>
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
                    {media.reviews && (
                        <Typography variant="body1" sx={{ margin: 1 }}><strong>Отзывы:</strong> {media.reviews.length}</Typography>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default MediaInfo;
