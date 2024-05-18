import React, { useEffect, useState } from "react";
import { Grid, Card, InputLabel, TextField, CardContent } from "@mui/material";
function Homepage() {
  const [animeData, setAnimeData] = useState([]);

  const API_URL = "https://api.jikan.moe/v4";

  const getTopAnime = async () => {
    const response = await fetch(`${API_URL}/top/anime?page=2`);
    setAnimeData(await response.json());
    console.log(animeData);
  };

  useEffect(() => {
    getTopAnime();
  }, []);

  return (
    <div>
      <button onClick={getTopAnime}>top anime</button>

      <Grid container spacing={4}>
        {animeData.data?.map((anime, index) => {
          return (
            <Grid item xs={4}>
              <Card>
                <CardContent>
                  <Grid item>{anime.title_english}</Grid>
                  <Grid item>
                    <img src={anime.images.jpg.image_url}></img>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
export default Homepage;
