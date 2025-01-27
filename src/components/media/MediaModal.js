import React from 'react';
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
import useMediaForm from '../../hooks/useMediaForm';

const MediaModal = ({ open, handleClose, onMediaAdded }) => {
    const { formik, alert } = useMediaForm(onMediaAdded);

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
