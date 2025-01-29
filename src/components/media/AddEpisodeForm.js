import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import useEpisodeForm from '../../hooks/media/useEpisodeForm';
import EpisodeForm from './EpisodeForm';

const AddEpisodeForm = ({ open, handleClose, seriesId, onEpisodeAdded }) => {
    const { formik, alert } = useEpisodeForm(seriesId, onEpisodeAdded);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Добавить новый эпизод</DialogTitle>
            <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                <DialogContent>
                    <EpisodeForm formik={formik} alert={alert} />
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
