import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, List, ListItem, Card, CardContent, CircularProgress} from '@mui/material';
import AddMediaButton from '../media/AddMedia';
import instance from "../../config/axios";

const MediaPage = () => {
    const [media, setMedia] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const response = await instance.get(`/media`);
                setMedia(response.data);
            } catch (error) {
                setError(error.message);
                console.error("Ошибка при получении медиа:", error);
            }
        };

        fetchMedia();

    }, []);
    const handleItemClick = (id) => {
        navigate(`/media/${id}`);
    };

    const handleMediaAdded = (newMedia) => {
        setMedia([...media, newMedia]);
    };

    if (error) {
        return <Typography color="error">Error: {error}</Typography>;
    }

    if (media.length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" component="h1" sx={{ marginBottom: 2 }}>
                Media List
            </Typography>
            <AddMediaButton onMediaAdded={handleMediaAdded} />
            <List>
                {media.map(item => (
                    <ListItem
                        key={item.id}
                        sx={{ margin: 2, cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
                        onClick={() => handleItemClick(item.id)}
                    >
                        <Card sx={{ width: '100%' }}>
                            <CardContent>
                                <Typography variant="h6" component="h2" gutterBottom>{item.title}</Typography>
                                <Typography variant="body2" sx={{ margin: 1 }}><strong>Жанр:</strong> {item.genre}</Typography>
                                <Typography variant="body2" sx={{ margin: 1 }}><strong>Режиссёр:</strong> {item.director}</Typography>
                                <Typography variant="body2" sx={{ margin: 1 }}><strong>Год Выхода:</strong> {item.releaseYear}</Typography>
                                {item.durationInMinutes && (
                                    <Typography variant="body2" sx={{ margin: 1 }}><strong>Продолжительность:</strong> {item.durationInMinutes} минут</Typography>
                                )}
                                {item.episodes && (
                                    <Typography variant="body2" sx={{ margin: 1 }}><strong>Кол-во серий:</strong> {item.episodes.length}</Typography>
                                )}
                                {item.reviews && (
                                    <Typography variant="body2" sx={{ margin: 1 }}><strong>Отзывы:</strong> {item.reviews.length}</Typography>
                                )}
                            </CardContent>
                        </Card>

                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default MediaPage;
