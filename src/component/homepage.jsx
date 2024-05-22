import React, { useEffect, useState } from "react";
import { Grid, Card, InputLabel, TextField, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
const Title = styled("div")(({ theme }) => ({
  backgroundColor: "#616161",
  border: "1px solid",
  color: "#fff",
  borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
  padding: theme.spacing(1),
  borderRadius: "4px",
  textAlign: "left",
  fontSize: "30px",
}));
function Homepage() {
  const [animeData, setAnimeData] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [searchAnimeName, setSearchAnimeName] = useState("");
  const API_URL = "https://api.jikan.moe/v4";

  const getTopAnime = async () => {
    const response = await fetch(`${API_URL}/top/anime?`);
    setAnimeData(await response.json());
    console.log(animeData);
  };
  const getPopularAnime = async () => {
    const response = await fetch(`${API_URL}/top/anime?filter=bypopularity`);
    setAnimeData(await response.json());
    console.log(animeData);
  };

  useEffect(() => {
    getTopAnime();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchAnimeName === "") {
    } else {
      searchAnime(searchAnimeName);
    }
  };

  async function searchAnime(search) {
    const response = await fetch(`${API_URL}/anime?q=${search}`);
    const data = await response.json();
    setAnimeData(data);
    console.log(animeData);
  }

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Title>Anime Database</Title>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleSearchSubmit}>
            <TextField
              id="outlined-basic"
              label="Enter in title of an anime"
              onChange={(e) => setSearchAnimeName(e.target.value)}
            ></TextField>

            <button className="btn btn-success"> Search Anime</button>
          </form>
          <button onClick={getTopAnime}>Top anime</button>
          <button onClick={getPopularAnime}>Popular anime</button>
        </Grid>
        <Grid item xs={12}></Grid>
        {animeData.data?.map((anime) => {
          return (
            <Grid item xs={5} sm={3}>
              <Card>
                <CardContent>
                  <Grid item>
                    <h2>{anime.title_english}</h2>
                  </Grid>
                  <Grid item>{anime.title}</Grid>
                  <Grid item>Score: {anime.score}</Grid>
                  <Grid item>
                    <img
                      src={anime.images.jpg.large_image_url}
                      style={{ maxWidth: "100%" }}
                    ></img>
                  </Grid>
                  <Grid item>
                    <Link
                      role="button"
                      className="btn btn-info "
                      to={`/anime-database/details/${anime.mal_id}`}
                    >
                      Details
                    </Link>
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
