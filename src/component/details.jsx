import React, { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Box,
  Grid,
  Divider,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ExpandMoreIcon,
  Button,
  Card,
  CardContent,
} from "@mui/material";

const Title = styled("div")(({ theme }) => ({
  backgroundColor: "#2e51a2",
  border: "1px solid",
  color: "#fff",
  borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
  padding: theme.spacing(1),
  borderRadius: "4px",
  textAlign: "left",
  fontSize: "30px",
}));

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",

  borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
  padding: theme.spacing(1),
  borderRadius: "4px",
  textAlign: "left",
}));

const Pillar = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  border: "1px solid",
  borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
  padding: theme.spacing(1),
  borderRadius: "4px",
  textAlign: "left",
}));

function Details() {
  const { id } = useParams();
  const [review, setReview] = useState([]);
  const [anime, setAnime] = useState([]);
  {
    /*info and set info is used to grab objects witin in the data object*/
  }
  const [info, setInfo] = useState({
    image: "",
    studio: "",
    genres: [],
    review: "",
  });
  const API_URL = "https://api.jikan.moe/v4";

  async function searchAnime(id) {
    const response = await fetch(`${API_URL}/anime/${id}`);
    const data = await response.json();
    setAnime(data.data);
    setInfo({
      ...info,
      image: data.data.images.jpg.large_image_url,
      studio: data.data.studios[0].name,
      genres: data.data.genres,
    });
    console.log(data);
    console.log(anime);
  }

  async function getReviews(id) {
    const response = await fetch(`${API_URL}/anime/${id}/reviews?limit=1`);
    const data = await response.json();
    setReview(data);
    console.log(review);
  }

  useEffect(() => {
    searchAnime(id);
    getReviews(id);
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid sm={12}>
          <Title>
            {anime.title_english}
            <div>{anime.title}</div>
          </Title>
        </Grid>
        <Grid xs={15} sm={2}>
          <Pillar>
            <Item>
              <img src={info.image} style={{ maxWidth: "100%" }}></img>
            </Item>
            <Item>
              Information:
              <Divider />
              <Item>Type: {anime.type}</Item>
              <Item>Episodes: {anime.episodes}</Item>
              <Item>Status: {anime.status}</Item>
              <Item>
                Premiered: {anime.season} {anime.year}
              </Item>
              <Item>Studio: {info.studio}</Item>
              <Item>
                {/*display the values as of one line with comma seperation*/}
                Genres: {info.genres?.map((genres) => genres.name).join(", ")}
              </Item>
              <Item>
                <Link
                  role="button"
                  className="btn btn-info "
                  to={`/anime-database/`}
                >
                  Back
                </Link>
              </Item>
            </Item>
          </Pillar>
        </Grid>
        <Grid xs={12} sm={10}>
          <Item>
            <h5>Score: {anime.score}</h5>
          </Item>
          <Item>
            Synopsis:
            <Divider />
            {anime.synopsis}
          </Item>
          <Item>
            Background:
            <Divider />
            {anime.background}
          </Item>
          <Item>
            <Accordion>
              <AccordionSummary
                aria-controls="panel1-content"
                id="panel1-header"
              >
                Reviews
              </AccordionSummary>
              <AccordionDetails>
                {review.data?.slice(0, 3).map((anime) => {
                  return (
                    <Card>
                      <CardContent>
                        <div>Score: {anime.score}</div>
                        <div>{anime.review}</div>
                      </CardContent>
                    </Card>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Details;
