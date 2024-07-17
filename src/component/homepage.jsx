import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  TextField,
  CardContent,
  CardHeader,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Title } from "./style";

function Homepage() {
  const [animeData, setAnimeData] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [searchAnimeName, setSearchAnimeName] = useState("");
  const API_URL = "https://api.jikan.moe/v4";
  const [info, setInfo] = useState([]);

  const getTopAnime = async (num) => {
    const response = await fetch(`${API_URL}/top/anime?page=${num}`);
    const data = await response.json();
    setAnimeData(data);
    setInfo(data.pagination);
  };

  const getPopularAnime = async (num) => {
    const response = await fetch(
      `${API_URL}/top/anime?filter=bypopularity&page=${num}`
    );
    const data = await response.json();
    setAnimeData(data);
  };

  useEffect(() => {
    getTopAnime(pageNum);
  }, [pageNum]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchAnimeName === "") {
      return;
    }
    searchAnime(searchAnimeName);
  };

  const handleNextPage = () => {
    setPageNum((prevPageNum) => prevPageNum + 1);
  };

  const handlePrevPage = () => {
    if (pageNum > 1) {
      setPageNum((prevPageNum) => prevPageNum - 1);
    }
  };
  const searchAnime = async (search) => {
    const response = await fetch(`${API_URL}/anime?q=${search}`);
    const data = await response.json();
    setAnimeData(data);
  };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Title>Anime Database</Title>
          <Button variant="contained" onClick={() => getTopAnime(pageNum)}>
            Top anime
          </Button>
          <Button variant="contained" onClick={() => getPopularAnime(pageNum)}>
            Popular anime
          </Button>
          <Button variant="contained" onClick={handlePrevPage}>
            Prev Page
          </Button>
          <Button variant="contained" onClick={handleNextPage}>
            Next Page
          </Button>
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
        </Grid>
        {animeData.data?.map((anime) => {
          return (
            <Grid item xs={5} sm={3} key={anime.mal_id}>
              <Card>
                <CardContent>
                  <CardHeader
                    title={anime.title_english}
                    subheader={anime.title}
                  ></CardHeader>
                  <Grid item>Score: {anime.score}</Grid>
                  <Grid item>
                    <img
                      src={anime.images.jpg.large_image_url}
                      style={{ maxWidth: "100%" }}
                      alt={anime.title_english}
                    ></img>
                  </Grid>
                  <Grid item>
                    <Link
                      role="button"
                      className="btn btn-info"
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
