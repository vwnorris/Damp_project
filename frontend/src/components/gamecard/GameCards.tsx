import React, { useEffect } from "react";
import { observer } from 'mobx-react';
import { GameCardDisplay } from "./GameCardDisplay";
import { runInAction } from "mobx";
import { useStores } from '../../hooks';
import { Game } from "../../types";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { GameCardModal } from "./GameCardModal";
import { BackToTopButton } from './BackToTopButton';

export const GameCards = observer((props: {darkmode?: boolean}) => {
    const { store } = useStores();

    const handleScroll = (_: Event) => {
        const bottom = window.scrollY + window.innerHeight > document.body.clientHeight - 300;
        if (bottom && !store.dataStore.loading && !store.dataStore.allFound) {
            runInAction(() => {
                store.dataStore.getMoreData();
            })
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    const handleClose = (event: object, reason: string) => {
        store.modalStore.unSelectGame();
        
    }
    
    return (
        <Grid container spacing={2} justifyContent="space-evenly" alignItems="stretch" data-testid="gameCardContainer">
            {(store.dataStore.data.length === 0 && !store.dataStore.loading) ? <Typography textAlign={'center'}>No games found :(</Typography> : <></>}

            {store.dataStore.data.map((game: Game) => 
                <Grid item key={game.appId} md={4} sm={6} xs={10}>
                    <GameCardDisplay game={game} onClick={() => store.modalStore.selectGame(game.appId)}/>
                </Grid>
            )}
            
            <GameCardModal open={store.modalStore.showModal} onClose={handleClose} />
            {store.dataStore.loading && <Box sx={{mx: 'auto', width: 'fit-content'}}><CircularProgress sx={{mx: 'auto'}}/></Box>}
            <BackToTopButton data-testid="back-to-top-button" darkmode={props.darkmode}/>
        </Grid>
    );
});
            

