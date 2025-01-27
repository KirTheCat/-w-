import React from 'react';
import { Box, Avatar, Typography, Rating } from '@mui/material';
import useMedia from '../../hooks/useMedia';

const Comments = ({ comment }) => {
    const { ratingEnumToValue, getColorFromString, getContrastingColor } = useMedia();
    const avatarColor = getColorFromString(comment.authorInfo);
    const textColor = getContrastingColor(avatarColor);
    const initial = comment.authorInfo.charAt(14).toUpperCase();
    const ratingValue = ratingEnumToValue[comment.rating];

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            <Avatar sx={{ backgroundColor: avatarColor, color: textColor, marginRight: 2 }}>
                {initial}
            </Avatar>
            <Box>
                <Typography variant="body1">{comment.text}</Typography>
                <Typography variant="body2" color="textSecondary">{comment.authorInfo}</Typography>
                <Rating value={ratingValue} readOnly max={5} size="small" />
            </Box>
        </Box>
    );
};

export default Comments;
