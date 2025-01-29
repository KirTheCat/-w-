import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import useMediaList from '../hooks/media/useMediaList';
import AddMediaButton from "../components/media/AddMediaButton";
import MediaList from "../components/media/MediaList";


const MediaPage = () => {
    const { media, setMedia, error } = useMediaList();

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
            <MediaList media={media} />
        </Box>
    );
};

export default MediaPage;
