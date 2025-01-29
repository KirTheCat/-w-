import { useState } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { object, string, number } from 'yup';
import instance from '../../config/axios';

const useMediaForm = (onMediaAdded) => {
    const [alert, setAlert] = useState(null);
    const authState = useSelector((state) => state.authState);
    const token = authState?.user?.token;

    const validationSchema = object().shape({
        title: string().required('Название обязательно'),
        genre: string().required('Жанр обязателен'),
        director: string()
            .required('Имя режиссёра обязательно')
            .matches(/^[a-zA-Zа-яА-Я\s]+$/, 'Имя не должно содержать цифры'),
        releaseYear: number()
            .required('Год выхода обязателен')
            .min(1914, 'Год выхода должен быть больше чем 1914')
            .max(new Date().getFullYear(), 'Год выхода не может быть больше текущего'),
        type: string().required('Тип обязателен'),
        durationInMinutes: number()
            .when('type', {
                is: (val) => val === 'movie',
                then: (schema) => schema.required('Продолжительность обязательна').min(1, 'Продолжительность должна быть больше 0'),
                otherwise: (schema) => schema.nullable(),
            }),
        episodes: number()
            .when('type', {
                is: (val) => val === 'series',
                then: (schema) => schema.required('Количество серий обязательна').min(1, 'Количество серий должна быть больше 0'),
                otherwise: (schema) => schema.nullable(),
            }),
    });

    const formatMediaData = (values) => {
        const mediaData = { ...values };
        if (values.type === 'movie') {
            mediaData.durationInMinutes = parseInt(values.durationInMinutes, 10);
            delete mediaData.episodes;
        } else if (values.type === 'series') {
            mediaData.episodes = parseInt(values.episodes, 10);
            delete mediaData.durationInMinutes;
        }
        return mediaData;
    };

    const formik = useFormik({
        initialValues: {
            title: '',
            genre: '',
            director: '',
            releaseYear: '',
            type: 'movie',
            durationInMinutes: '',
            episodes: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const mediaData = formatMediaData(values);
            try {
                const response = await instance.post(`/media`, mediaData, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                onMediaAdded(response.data);
                setAlert({ type: 'success', message: 'Добавлено' });
                formik.resetForm();
            } catch (error) {
                setAlert({ type: 'error', message: 'Ошибка: ' + error.message });
            }
        }
    });

    return { formik, alert, setAlert };
};

export default useMediaForm;
