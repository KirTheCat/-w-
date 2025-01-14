import React from 'react';
import {Box, Avatar, Typography, Rating} from '@mui/material';

const ratingEnumToValue = {
    "ZERO_STAR": 0,
    "ONE_STAR": 1,
    "TWO_STARS": 2,
    "THREE_STARS": 3,
    "FOUR_STARS": 4,
    "FIVE_STARS": 5,
};
const getColorFromString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = '#' + (hash & 0x00FFFFFF).toString(16).padStart(6, '0');
    return color;
};

const getContrastingColor = (color) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? 'black' : 'white';
};

const Comment = ({comment}) => {
    const avatarColor = getColorFromString(comment.authorInfo);
    const textColor = getContrastingColor(avatarColor);
    const initial = comment.authorInfo.charAt(14).toUpperCase();
    const ratingValue = ratingEnumToValue[comment.rating];
    return (
        <Box sx={{display: 'flex', alignItems: 'center', marginBottom: 2}}>
            <Avatar
                sx={{backgroundColor: avatarColor, color: textColor, marginRight: 2}}> {initial}
            </Avatar>

            <Box>
                <Typography
                    variant="body1">{comment.text}
                </Typography>

                <Typography variant="body2"
                    color="textSecondary">{comment.authorInfo}
                </Typography>

                <Rating value={ratingValue} readOnly max={5} size="small"/>
           </Box>
        </Box>);
};

export default Comment;
