import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MediaModal from './MediaModal';

const AddMediaButton = ({ onMediaAdded }) => {
    const [open, setOpen] = useState(false);
    const authState = useSelector((state) => state.authState);
    const isAdmin = authState?.user?.role === 'ROLE_ADMIN';

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    if (!isAdmin) {
        return null;
    }

    return (
        <>
            <IconButton onClick={handleClickOpen} sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000 }}>
                <AddIcon />
            </IconButton>
            <MediaModal open={open} handleClose={handleClose} onMediaAdded={onMediaAdded} />
        </>
    );
};

export default AddMediaButton;
