import { useState, useCallback } from 'react';
import instance from '../../config/axios';
import handleError from '../../utils/handleError';

const useEpisodes = (mediaId) => {
    const [episodes, setEpisodes] = useState([]);
    const [error, setError] = useState(null);

    const fetchEpisodes = useCallback(async () => {
        try {
            const response = await instance.get(`/media/${mediaId}/episodes`);
            setEpisodes(response.data);
        } catch (error) {
            handleError(error, setError, "Ошибка при получении серий:");
        }
    }, [mediaId]);

    return { episodes, error, fetchEpisodes };
};

export default useEpisodes;
