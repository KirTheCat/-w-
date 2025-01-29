import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CircularProgress, Button, Rating, List, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Comments from './Comments';
import AddComment from './AddComment';
import AddEpisodeForm from './AddEpisodeForm';
import useMedia from '../../hooks/media/useMedia';
import useEpisodes from '../../hooks/media/useEpisodes';
import { useSelector } from "react-redux";

const MediaItem = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.authState.isAuthenticated);
    const authState = useSelector((state) => state.authState);
    const isAdmin = authState?.user?.role === 'ROLE_ADMIN';

    const {
        mediaItem,
        reviews,
        averageRating,
        error,
        open,
        handleClickOpen,
        handleClose,
        handleEpisodeAdded,
        handleCommentAdded,
    } = useMedia(id);

    const { episodes, fetchEpisodes } = useEpisodes(id);
    const [accordionOpen, setAccordionOpen] = useState(false);

    const handleAccordionToggle = () => {
        if (!accordionOpen) {
            fetchEpisodes();
        }
        setAccordionOpen(!accordionOpen);
    };

    if (error) {
        return <Typography color="error">Ошибка: {error}</Typography>;
    }

    if (!mediaItem) {
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
                    <Typography variant="h4" component="h1" gutterBottom>{mediaItem.title}</Typography>
                    <Typography variant="body1" sx={{ margin: 1 }}><strong>Жанр:</strong> {mediaItem.genre}</Typography>
                    <Typography variant="body1" sx={{ margin: 1 }}><strong>Режиссёр:</strong> {mediaItem.director}</Typography>
                    <Typography variant="body1" sx={{ margin: 1 }}><strong>Год Выхода:</strong> {mediaItem.releaseYear}</Typography>
                    {mediaItem.durationInMinutes && (
                        <Typography variant="body1" sx={{ margin: 1 }}><strong>Продолжительность:</strong> {mediaItem.durationInMinutes} минут</Typography>
                    )}
                    {mediaItem.episodes && (
                        <>
                            <Box sx={{ display: 'flex', alignItems: 'center', margin: 1 }}>
                                <Typography variant="body1"><strong>Общий рейтинг:</strong></Typography>
                                <Rating value={averageRating} readOnly max={5} sx={{ marginLeft: 1 }} precision={0.1} />
                            </Box>

                            <Typography variant="body1" sx={{ margin: 1 }}><strong>Кол-во серий:</strong> {mediaItem.episodes.length}</Typography>
                            <Accordion expanded={accordionOpen} onChange={handleAccordionToggle}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>Список серий</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {episodes.length > 0 ? (
                                        <List>
                                            {episodes.map((episode, index) => (
                                                <Box key={index} sx={{ marginBottom: 2 }}>
                                                    <Typography variant="h6">{episode.title}</Typography>
                                                    <Typography variant="body2">Дата выхода: {episode.releaseDate}</Typography>
                                                </Box>
                                            ))}
                                        </List>
                                    ) : (
                                        <Typography variant="body2">Серий пока нет.</Typography>
                                    )}
                                </AccordionDetails>
                            </Accordion>
                        </>
                    )}

                    <Box sx={{ margin: 1 }}>
                        <Typography variant="h6">Отзывы</Typography>
                        {reviews && reviews.length > 0 ? (
                            <List>
                                {reviews.map((review, index) => (
                                    <Comments key={index} comment={review} />
                                ))}
                            </List>
                        ) : (
                            <Typography variant="body2">Отзывов пока нет.</Typography>
                        )}
                    </Box>
                    {!isAuthenticated ?
                        (<Typography>Чтобы оставлять комментарии требуется авторизация</Typography>) :
                        (<AddComment mediaId={id} onCommentAdded={handleCommentAdded} />)
                    }

                    {mediaItem.type === 'series' && isAdmin && (
                        <>
                            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                                Добавить эпизод
                            </Button>
                            <AddEpisodeForm open={open} handleClose={handleClose} seriesId={mediaItem.id} onEpisodeAdded={handleEpisodeAdded} />
                        </>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default MediaItem;
