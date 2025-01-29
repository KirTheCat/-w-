import { useState } from 'react';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import instance from '../../config/axios';

const useEpisodeForm = (seriesId, onEpisodeAdded) => {
    const [alert, setAlert] = useState(null);

    const validationSchema = object().shape({
        title: string().required('Название обязательно'),
        releaseDate: string().required('Дата выхода обязательна')
    });

    const formik = useFormik({
        initialValues: {
            title: '',
            releaseDate: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            const episodeData = { ...values };
            try {
                const response = await instance.post(`/media/${seriesId}/add_ep`, episodeData);
                onEpisodeAdded(response.data);
                setAlert({ type: 'success', message: 'Эпизод добавлен' });
                resetForm();
            } catch (error) {
                setAlert({ type: 'error', message: 'Ошибка: ' + error.message });
            }
        }
    });

    return { formik, alert };
};

export default useEpisodeForm;
