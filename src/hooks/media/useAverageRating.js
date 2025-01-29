import { useState, useEffect, useCallback } from 'react';
import instance from '../../config/axios';
import handleError from '../../utils/handleError';

const useAverageRating =  (id) =>{
    const [averageRating, setAverageRating] = useState(0);
    const [error, setError] = useState(null);

    const fetchAverageRating = useCallback(async () => {
        try {
            const response = await instance.get(`/media/${id}/average_rating`);
            if (response.status === 200) {
                const ratingString = response.data;
                const match = ratingString.match(/Средний рейтинг:\s*(\d+(\.\d+)?)/);
                const average = match ? parseFloat(match[1]) : 0;
                setAverageRating(average);
            } else {
                setAverageRating(0);
            }
        }catch (error) {
            if (error.response && error.response.status === 404) {
                setAverageRating(0);
            } else {
                handleError(error, setError, "Ошибка при получении среднего рейтинга:");
                setAverageRating(0);
            }

        }

        }, [id]);
    useEffect(() => {
        if (id) fetchAverageRating();
    }, [id, fetchAverageRating]);

    return { averageRating, error, fetchAverageRating };
};

export default useAverageRating;
