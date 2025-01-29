import { useState, useEffect, useCallback } from 'react';
import instance from '../../config/axios';
import handleError from '../../utils/handleError';

const useMediaItem = (id) => {
    const [media, setMedia] = useState(null);
    const [error, setError] = useState(null);

    const fetchMediaItem = useCallback(async () => {
        try {
            const response = await instance.get(`/media/${id}`);
            setMedia(response.data);
        } catch (error) {
            handleError(error, setError);
        }
    }, [id]);

    useEffect(() => {
        if (id) fetchMediaItem();
    }, [id, fetchMediaItem]);

    return { media, error, fetchMediaItem };
};

export default useMediaItem;
