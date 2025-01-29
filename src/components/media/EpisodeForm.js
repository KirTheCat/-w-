import React from 'react';
import { TextField, Alert } from '@mui/material';

const EpisodeForm = ({ formik, alert }) => (
    <>
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
    </>
);

export default EpisodeForm;
