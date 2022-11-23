import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Chip, Grid } from "@mui/material";
import { observer } from "mobx-react";
import { Game } from "../../types";

// genres to color
const genreColorMap = {
  "Accounting": "#440154",
  "Action": "#470d60",
  "Adventure": "#48186a",
  "Animation & Modeling": "#482374",
  "Audio Production": "#472d7b",
  "Casual": "#453781",
  "Design & Illustration": "#424086",
  "Documentary": "#3e4989",
  "Early Access": "#3b528b",
  "Education": "#375b8d",
  "Free to Play": "#33638d",
  "Game Development": "#2f6b8e",
  "Gore": "#2c728e",
  "HTC": "#297a8e",
  "Indie": "#26828e",
  "Massively Multiplayer": "#23898e",
  "Movie": "#21918c",
  "Nudity": "#1f988b",
  "Photo Editing": "#1fa088",
  "RPG": "#22a785",
  "Racing": "#28ae80",
  "Sexual Content": "#32b67a",
  "Short": "#3fbc73",
  "Simulation": "#4ec36b",
  "Software Training": "#5ec962",
  "Sports": "#70cf57",
  "Strategy": "#84d44b",
  "Tutorial": "#98d83e",
  "Utilities": "#addc30",
  "Valve": "#c2df23",
  "Video Production": "#d8e219",
  "Violent": "#ece51b",
  "Web Publishing": "#fde725",
};

export const GameCardDisplay = observer((props: { game: Game; onClick: () => void }) => {
    
  
  const showRating = (text: string) => {
      if (text === "" || text === null) {
        return "";
      }

      const index = text.indexOf("-");

      if (text.substring(index + 2, index + 4) === "Ne") {
        return "";
      }

      return "⭐ " + text.substring(index + 2, index + 4) + "%";
    };

    const showImage = (url: string) => {
      if (url === null || url === "") {
        return (
          <CardMedia
            alt="complex"
            src="/images/default.png"
            component="img"
            height="140"
          />
        );
      }
      return <CardMedia alt="complex" src={url} component="img" height="140" />;
    };

    return (
      <Card
        sx={{
          maxWidth: 345,
          boxShadow: 3,
          margin: "auto",
          marginBottom: 1,
          marginTop: 1,
          display: "block",
          height: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
        onClick={props.onClick}
        data-testid={`gameCard-${props.game.name.replace(/\s/g, '')}`}
      >
        <CardActionArea sx={{height: 1}}>
          {showImage(props.game.imagePath)}
          <CardContent sx={{height: 1}}>
            <Grid container direction="column" display="flex">
              <Grid item container direction="row" justifyContent="space-between">
                  <Grid item xs={8}>
                    <Typography
                      fontSize={"1rem"}
                      fontWeight="bold"
                    >
                      {props.game.name.replace(/(\r\n|\n|\r)/gm, "")}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="subtitle1" component="div">
                      {showRating(props.game.all_reviews)}
                    </Typography>
                  </Grid>
              </Grid>
              <Grid item flexGrow={1}>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <Typography
                    variant="body2"
                    gutterBottom
                    color="text.secondary"
                  >
                    {props.game.release_date}
                  </Typography>
                  <Typography
                    variant="body2"
                    gutterBottom
                    color="text.secondary"
                  >
                    {props.game.price === 0 ? "Free" : `${props.game.price}$`}
                  </Typography>
                </Box>
              </Grid>
              <Grid item display="flex" flexWrap="wrap" flexDirection="row">
                    {props.game.genre !== null && props.game.genre.slice(0,3).map(genre => 
                        <Chip label={genre} key={genre} sx={{mr: 0.5, mb: 0.5, backgroundColor: genreColorMap[genre as keyof typeof genreColorMap], color: 'white', fontSize: "0.8rem"}}/>
                    )}
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
);
