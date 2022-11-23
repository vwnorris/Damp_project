import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button, ButtonBase, Card, CardActions, CardContent, FormControl, Modal,  Rating, Stack, styled, TextField, Typography } from '@mui/material';
import { Comment } from '../../types';
import { CommentView } from './Comment';
import { ExpandMore } from '@mui/icons-material';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../graphQL';
import { useStores } from '../../hooks';
import { observer } from 'mobx-react';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '120%',
    maxHeight: '200%',
});

const styleCard = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: 500,
    overflow: "hidden",
    overflowY: "scroll",
};

export const GameCardModal = observer((props: { open: boolean, onClose: ((event?: object, reason?: string) => void) | (() => void) | ((event: object, reason: string) => void) }) => {
    const [rating, setRating] = useState<number | null>(0);
    const [name, setName] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const [nameError, setNameError] = useState<boolean>(false);
    const [commentError, setCommentError] = useState<boolean>(false);
    const [addComment] = useMutation(ADD_COMMENT);

    const { store } = useStores();

    const showImage = (url: string) => {
        if (url === null || url === "") {
            return(<Img alt="complex" src="/images/default.png" />)
        }
        return(<Img alt="complex" src={url} />)
    };

    const showList = (list: string[]) => {
        if (list === null || list === undefined || list.length === 0) {
            return "..."
        }

        let textString = ""
        list.forEach(element => {
            textString += element + ", "
        });

        return textString.substring(0, textString.length - 2);
    };

    const showDescription = (text: string) => {
        let t = text.substring(300)
        let index = t.indexOf('.')

        return text.substring(17, 300 + index + 1);
        
    };

    const showPrice = (price: number) => {
        if (price === null || price === undefined || price === 0) {
            return "Free"
        }
        return "$" + price
    };

    const handleChangeRating = (_: React.SyntheticEvent, newValue: number | null) => {
        setRating(newValue);
    }
    
    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleChangeComment = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    }

    const handleAddComment = async () => {
        setNameError(false);
        setCommentError(false);
        if (name === "") {
            setNameError(true);
            return;
        }

        if (comment === "") {
            setCommentError(true);
            return;
        }

        if (store.modalStore.game) {
            addComment({
                variables: {
                    game: store.modalStore.game.appId,
                    comment: {
                        name: name,
                        rating: rating,
                        comment: comment
                    }
                }
            }).then(() => {
                store.modalStore.updateGameData();
            })
            setName("")
            setComment("")
            setRating(0)
        }

    }
    // return nothing if a game is not selected
    if (store.modalStore.game === undefined) return (<></>);
    else return (
        <Modal
            open={(props.open && store.modalStore.game !== undefined)} 
            onClose={props.onClose} 
            aria-labelledby="game-modal"
            aria-describedby="modal for showing more info about a game."
            sx = {{ bgcolor: 'rgba(0, 0, 0, 0.8)' }}
        >
            <Card sx={{...styleCard}} style={{maxWidth: "650px", height: '90%' }}>
                    <ButtonBase sx={{ width: "100%", backgroundColor: "black"}}>
                        {showImage(store.modalStore.game.imagePath)}
                    </ButtonBase> 
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {store.modalStore.game.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {store.modalStore.game.release_date}
                        </Typography>
                        <br/>
                        <Typography gutterBottom variant="h6" component="div" >
                            Some info
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <span style={{fontWeight: 'bold'}}>Price: </span> {showPrice(store.modalStore.game.price)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <span style={{fontWeight: 'bold'}}>Genre: </span> {showList(store.modalStore.game.genre)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <span style={{fontWeight: 'bold'}}>Language: </span> {showList(store.modalStore.game.languages)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <span style={{fontWeight: 'bold'}}>Achievements: </span> {store.modalStore.game.achievements}
                        </Typography>
                        <br/>
                        {store.modalStore.game.game_description.length > 20 &&
                        <> 
                        <Typography gutterBottom variant="h6" component="div">
                            Description
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {showDescription(store.modalStore.game.game_description)}
                        </Typography> 
                        </> }
                        <br/>
                        {store.modalStore.game.all_reviews && 
                            <>  
                            <Typography gutterBottom variant="h6" component="div">
                                Reviews
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {store.modalStore.game.all_reviews}
                            </Typography> 
                            </>
                        }
                    </CardContent>
                    <CardActions>
                        <Accordion sx={{width: 1}}>
                            <AccordionSummary expandIcon={<ExpandMore/>} data-testid="make_comment">
                                Add comment
                            </AccordionSummary>
                            <AccordionDetails>
                                <FormControl fullWidth>
                                    <Stack gap={1}>
                                        <Stack direction='row' gap={2} sx={{width: 1, display: 'flex', alignContent: 'center' }}>
                                            <TextField label="name" placeholder='username' value={name} onChange={handleChangeName} error={nameError} required data-testid="name_textbox"/>
                                            <Stack direction='row'>
                                                <Typography component="legend">Rating</Typography>
                                                <Rating data-testid="rating" name="rating" value={rating} onChange={handleChangeRating}/>
                                            </Stack>
                                        </Stack>
                                        
                                        <TextField label="comment" placeholder='comment' value={comment} onChange={handleChangeComment} multiline rows={4} error={commentError} required data-testid="comment_textbox"/>
                                        <Button onClick={handleAddComment} sx={{ boxShadow: 2}} data-testid="add_comment">Add comment</Button>
                                    </Stack>
                                </FormControl>
                            </AccordionDetails>
                        </Accordion>
                    </CardActions>
                    <CardContent>
                        {store.modalStore.game.comments.map((value: Comment, index: number) => <CommentView key={`${value.name}-${value.rating}-${value.comment}-${index}`} name={value.name} rating={value.rating} comment={value.comment}/>)}
                    </CardContent>
                </Card>
        </Modal>
    )
});
