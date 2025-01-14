import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Button,
    TextField,
    Select,
    MenuItem,
    Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from "../../config/ApiConfig";
import { object, string, number} from 'yup';

const MediaModal = ({ open, handleClose, onMediaAdded }) => {
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
                then: (schema) => schema
                    .required('Продолжительность обязательна')
                    .min(1, 'Продолжительность должна быть больше 0'),
                otherwise: (schema) => schema.nullable(),
            }),
        episodes: number()
            .when('type', {
                is: (val) => val === 'series',
                then: (schema) => schema
                    .required('Количество серий обязательна')
                    .min(1, 'Количество серий должна быть больше 0'),
                otherwise: (schema) => schema.nullable(),
            }),
    });

        // episodes: number()
        //     .when('type', {
        //         is: (val) => val === 'series',
        //         then: number()
        //             .required('Количество серий обязательна')
        //             .min(1, 'Количество серий должна быть больше 0'),
        //         otherwise: number().nullable(),
        //     }),



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
        onSubmit: (values) => {
            const mediaData = { ...values };
            if (values.type === 'movie') {
                mediaData.durationInMinutes = parseInt(values.durationInMinutes, 10);
                delete mediaData.episodes;
            } else if (values.type === 'series') {
                mediaData.episodes = parseInt(values.episodes, 10);
                delete mediaData.durationInMinutes;
            }
            axios.post(`${API_BASE_URL}/media`, mediaData, {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(response => {
                onMediaAdded(response.data);
                setAlert({ type: 'success', message: 'Добавлено' });
                formik.resetForm();
            }).catch(error => {
                setAlert({ type: 'error', message: 'Ошибка: ' + error.message });
            });
        }
    });

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                Добавить новое медиа
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                <DialogContent>
                    {alert && (
                        <Alert severity={alert.type} sx={{ mb: 2 }}>
                            {alert.message}
                        </Alert>
                    )}
                    <TextField
                        autoFocus
                        margin="dense"
                        name="title"
                        label="Название"
                        type="text"
                        fullWidth
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                    />
                    <TextField
                        margin="dense"
                        name="genre"
                        label="Жанр"
                        type="text"
                        fullWidth
                        value={formik.values.genre}
                        onChange={formik.handleChange}
                        error={formik.touched.genre && Boolean(formik.errors.genre)}
                        helperText={formik.touched.genre && formik.errors.genre}
                    />
                    <TextField
                        margin="dense"
                        name="director"
                        label="Режиссёр"
                        type="text"
                        fullWidth
                        value={formik.values.director}
                        onChange={formik.handleChange}
                        error={formik.touched.director && Boolean(formik.errors.director)}
                        helperText={formik.touched.director && formik.errors.director}
                    />
                    <TextField
                        margin="dense"
                        name="releaseYear"
                        label="Год Выхода"
                        type="number"
                        fullWidth
                        value={formik.values.releaseYear}
                        onChange={formik.handleChange}
                        error={formik.touched.releaseYear && Boolean(formik.errors.releaseYear)}
                        helperText={formik.touched.releaseYear && formik.errors.releaseYear}
                    />
                    <Select
                        name="type"
                        value={formik.values.type}
                        onChange={formik.handleChange}
                        fullWidth
                        sx={{ margin: '16px 0' }}
                    >
                        <MenuItem value="movie">Фильм</MenuItem>
                        <MenuItem value="series">Сериал</MenuItem>
                    </Select>
                    {formik.values.type === 'movie' && (
                        <TextField
                            margin="dense"
                            name="durationInMinutes"
                            label="Продолжительность (минуты)"
                            type="number"
                            fullWidth
                            value={formik.values.durationInMinutes}
                            onChange={formik.handleChange}
                            error={formik.touched.durationInMinutes && Boolean(formik.errors.durationInMinutes)}
                            helperText={formik.touched.durationInMinutes && formik.errors.durationInMinutes}
                        />
                    )}
                    {formik.values.type === 'series' && (
                        <TextField
                            margin="dense"
                            name="episodes"
                            label="Количество серий"
                            type="number"
                            fullWidth
                            value={formik.values.episodes}
                            onChange={formik.handleChange}
                            error={formik.touched.episodes && Boolean(formik.errors.episodes)}
                            helperText={formik.touched.episodes && formik.errors.episodes}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button type="reset" color="secondary">Очистить</Button>
                    <Button type="submit" color="primary" variant="contained">
                        Добавить
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default MediaModal;
