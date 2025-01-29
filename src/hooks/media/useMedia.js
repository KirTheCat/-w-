

import { useState, useEffect } from 'react';
import useMediaItem from './useMediaItem';
import useReviews from './useReviews';
import useAverageRating from './useAverageRating';
import useMediaList from './useMediaList';

const useMedia = (id = null) => {
    const { media: mediaItem, error: mediaItemError } = useMediaItem(id);
    const { reviews, error: reviewsError, fetchReviews } = useReviews(id);
    const { averageRating, error: ratingError, fetchAverageRating } = useAverageRating(id);
    const { media: mediaList, error: mediaListError } = useMediaList();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleEpisodeAdded = () => handleClose();

    const handleCommentAdded = () => {
        fetchReviews();
        fetchAverageRating();
    };

    const error = mediaItemError || reviewsError || ratingError || mediaListError;

    useEffect(() => {
        if (id) {
            fetchReviews();
            fetchAverageRating();
        }
    }, [id, fetchReviews, fetchAverageRating]);

    return {
        mediaItem,
        reviews,
        averageRating,
        error,
        open,
        handleClickOpen,
        handleClose,
        handleEpisodeAdded,
        handleCommentAdded,
        mediaList,
    };
};

export default useMedia;
