import {useCallback, useEffect, useState} from "react";
import instance from "../../config/axios";
import handleError from "../../utils/handleError";


const useMediaList = () => {
    const [media,setMedia] = useState([]);
    const [error, setError] = useState(null);

    const fetchMediaList = useCallback(async () => {
        try {
            const response = await instance.get(`/media`);
            setMedia(response.data);
        } catch (error) {
            handleError(error, setError);
        }
    }, []);

    useEffect(() =>{
        fetchMediaList();
    }, [fetchMediaList])
    return {media, error, fetchMediaList};
};

export default useMediaList;