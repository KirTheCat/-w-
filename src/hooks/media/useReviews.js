import {useCallback, useEffect, useState} from "react";
import instance from "../../config/axios";
import handleError from "../../utils/handleError";


const useReviews = (id) => {
    const [reviews, setReviews] = useState(null);
    const [error, setError] = useState(null);

    const fetchReviews = useCallback(async () => {
        try {
            const response = await instance.get(`/media/${id}/reviews`);
            setReviews(response.data);
        } catch (error) {
            handleError(error, setError,"Ошибка при получении отзывов:")
        }
    }, [id]);

    useEffect(() =>{
        if(id) fetchReviews();
    }, [id,fetchReviews])

return {reviews, fetchReviews, error}
};

export default useReviews;