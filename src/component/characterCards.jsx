import React from "react";
import { Grid, Card, CardContent, CardHeader } from "@mui/material";
import { Link } from "react-router-dom";
function CharacterCards({ anime }) {
  return (
    <Grid item xs={2}>
      <Card key={anime.character.mal_id}>
        <CardHeader
          title={anime.character.name}
          subheader={anime.role}
        ></CardHeader>
        <CardContent>
          {/*Currently just get the first voice actor so launages may be different from each character */}
          {/*Will add a show more page to see all of the voice actors of each lanuage */}
          {/* Might add a seperate character page to show full list of voice actors*/}
        </CardContent>
        <Grid item>
          <img
            src={anime.character.images.jpg.image_url}
            style={{
              width: "auto",
              height: "256px",
            }}
            alt={anime.character.name}
          />
        </Grid>
        <Link
          role="button"
          className="btn btn-info "
          to={`/anime-database/characters/${anime.character.mal_id}`}
        >
          Details
        </Link>
      </Card>
    </Grid>
  );
}
export default CharacterCards;
