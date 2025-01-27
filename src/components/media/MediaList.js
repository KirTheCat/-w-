import React from 'react';
import { List, ListItem, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MediaList = ({ media }) => {
    const navigate = useNavigate();

    const handleItemClick = (id) => {
        navigate(`/media/${id}`);
    };

    return (
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
    );
};

export default MediaList;
