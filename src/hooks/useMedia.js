import { useState, useEffect, useCallback } from 'react';
import instance from '../config/axios';

const ratingEnumToValue = {
    "ZERO_STAR": 0,
    "ONE_STAR": 1,
    "TWO_STARS": 2,
    "THREE_STARS": 3,
    "FOUR_STARS": 4,
    "FIVE_STARS": 5,
};

const ratingValueToEnum = {
    0: "ZERO_STAR",
    1: "ONE_STAR",
    2: "TWO_STARS",
    3: "THREE_STARS",
    4: "FOUR_STARS",
    5: "FIVE_STARS",
};

const getColorFromString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = '#' + (hash & 0x00FFFFFF).toString(16).padStart(6, '0');
    return color;
};

const getContrastingColor = (color) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? 'black' : 'white';
};

const useMedia = (id = null) => {
    const [media, setMedia] = useState(id ? null : []);
    const [error, setError] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [text, setText] = useState('');
    const [rating, setRating] = useState(0);

    const fetchMediaList = useCallback(async () => {
        try {
            const response = await instance.get(`/media`);
            setMedia(response.data);
        } catch (error) {
            setError(error.message);
        }
    }, []);

    const fetchMediaItem = useCallback(async () => {
        try {
            const response = await instance.get(`/media/${id}`);
            setMedia(response.data);
        } catch (error) {
            setError(error.message);
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

    const handleAddReviewSubmit = async (mediaId, onCommentAdded) => {
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

    useEffect(() => {
        if (id) {
            fetchMediaItem();
            fetchReviews();
            fetchAverageRating();
        } else {
            fetchMediaList();
        }
    }, [id, fetchMediaItem, fetchReviews, fetchAverageRating, fetchMediaList]);

    return {
        media,
        setMedia,
        reviews,
        averageRating,
        error,
        fetchReviews,
        fetchAverageRating,
        text,
        setText,
        rating,
        setRating,
        handleSubmit: handleAddReviewSubmit,
        ratingEnumToValue,
        getColorFromString,
        getContrastingColor
    };
};

export default useMedia;
