import React, { useState } from 'react';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import instance from '../../config/axios';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Alert
} from '@mui/material';

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
        onSubmit: (values, { resetForm }) => {
            const episodeData = { ...values };
            instance.post(`/media/${seriesId}/add_ep`, episodeData)
                .then(response => {
                    onEpisodeAdded(response.data);
                    setAlert({ type: 'success', message: 'Эпизод добавлен' });
                    resetForm();
                })
                .catch(error => {
                    setAlert({ type: 'error', message: 'Ошибка: ' + error.message });
                });
        }
    });

    return { formik, alert };
};

const AddEpisodeForm = ({ open, handleClose, seriesId, onEpisodeAdded }) => {
    const { formik, alert } = useEpisodeForm(seriesId, onEpisodeAdded);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Добавить новый эпизод</DialogTitle>
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
                        name="releaseDate"
                        label="Дата выхода"
                        type="text"
                        fullWidth
                        value={formik.values.releaseDate}
                        onChange={formik.handleChange}
                        error={formik.touched.releaseDate && Boolean(formik.errors.releaseDate)}
                        helperText={formik.touched.releaseDate && formik.errors.releaseDate}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Отмена</Button>
                    <Button type="submit" color="primary" variant="contained">
                        Добавить
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddEpisodeForm;
