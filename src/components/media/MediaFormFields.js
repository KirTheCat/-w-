import React from 'react';
import { TextField, Select, MenuItem } from '@mui/material';

const MediaFormFields = ({ formik }) => {
    return (
        <>
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
        </>
    );
};

export default MediaFormFields;
