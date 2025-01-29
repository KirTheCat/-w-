import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Button, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MediaFormFields from './MediaFormFields';
import useMediaForm from '../../hooks/media/useMediaForm';

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
                    <MediaFormFields formik={formik} />
                </DialogContent>
                <DialogActions>
                    <Button type="reset" color="secondary" onClick={formik.handleReset}>Очистить</Button>
                    <Button type="submit" color="primary" variant="contained">
                        Добавить
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default MediaModal;
