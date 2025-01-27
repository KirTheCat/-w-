import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CircularProgress, Button, Rating, List } from '@mui/material';
import Comments from './Comments';
import AddComment from './AddComment';
import AddEpisodeForm from './AddEpisodeForm';
import useMedia from '../../hooks/useMedia';
import { useSelector } from "react-redux";

const MediaItem = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { media, reviews, averageRating, error, fetchReviews, fetchAverageRating } = useMedia(id);
    const isAuthenticated = useSelector((state) => state.authState.isAuthenticated);
    const authState = useSelector((state) => state.authState);
    const isAdmin = authState?.user?.role === 'ROLE_ADMIN';
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleEpisodeAdded = () => {
        handleClose();
    };

    const handleCommentAdded = () => {
        fetchReviews();
        fetchAverageRating();
    };

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

    return (
        <Box sx={{ padding: 2 }}>
            <Button variant="contained" onClick={() => navigate(-1)} sx={{ marginBottom: 2 }}>
                Назад
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
                                    <Comments key={index} comment={review} />
                                ))}
                            </List>
                        ) : (
                            <Typography variant="body2">Отзывов пока нет.</Typography>
                        )}
                    </Box>
                    {!isAuthenticated?
                        (<Typography>Чтобы оставлять комментарии требуется авторизация</Typography>):
                        (<AddComment mediaId={id} onCommentAdded={handleCommentAdded} />)
                    }

                    {media.type === 'series' && isAdmin && (
                        <>
                            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                                Добавить эпизод
                            </Button>
                            <AddEpisodeForm open={open} handleClose={handleClose} seriesId={media.id} onEpisodeAdded={handleEpisodeAdded} />
                        </>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default MediaItem;
