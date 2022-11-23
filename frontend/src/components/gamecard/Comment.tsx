import { Box, Card, Divider, Rating, Stack, Typography } from '@mui/material';
import React from 'react';

export const CommentView = (props: {name: string, rating: number, comment: string}) => {

    return (
        <Card sx={{width: 1, my: 1, marginBottom:3, boxShadow:2}}>
            <Stack sx={{p:2}} gap={2}>
                <Box>
                    <Typography variant="subtitle2">User:</Typography>
                    <Typography component="div" variant="h6" style={{fontWeight: 'bold'}}>{props.name}</Typography>
                    <Divider></Divider>
                </Box>
                <Box>
                    <Typography component="legend" variant="subtitle2">Rating:</Typography>
                    <Rating name="rating" value={props.rating} readOnly/>
                </Box>
                    <Typography>{props.comment}</Typography>
            </Stack>
        </Card>
    )
}