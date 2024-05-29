import { Review } from "./review";
import React, { useEffect, useState } from "react";
import { Title, Pillar, Item } from "./style";
import { useParams, Link } from "react-router-dom";
import Recommendation from "./recommendation.jsx";
import {
  Box,
  Grid,
  Divider,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";

function Details() {
  const { id } = useParams();
  const [recommendations, setRecommendations] = useState([]);
  const [characters, setCharacters] = useState([]);
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
    const response = await fetch(`${API_URL}/anime/${id}/characters`);
    const data = await response.json();
    setCharacters(data);
    console.log(characters);
  }

  async function getCharacters(id) {
    const response = await fetch(`${API_URL}/anime/${id}/reviews`);
    const data = await response.json();
    setReview(data);
    console.log(review);
  }

  async function getRecommendations(id) {
    const response = await fetch(`${API_URL}/anime/${id}/recommendations`);
    const data = await response.json();
    setRecommendations(data);
  }

  async function setUp(id) {
    searchAnime(id);
    getReviews(id);
    getRecommendations(id);
    getReviews(id);
  }
  useEffect(() => {
    setUp(id);
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
                {review.data?.slice(0, 5).map((anime) => {
                  return (
                    <Card>
                      <Review anime={anime} setUp={setUp} />
                    </Card>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          </Item>
          <Item>
            <Accordion defaultExpanded>
              <AccordionSummary
                aria-controls="panel1-content"
                id="panel2-header"
              >
                Characters
              </AccordionSummary>
              <AccordionDetails>
                <Grid container wrap="nowrap">
                  {characters.data?.slice(0, 5).map((anime) => {
                    return (
                      <Card>
                        <CardHeader
                          title={anime.character.name}
                          subheader={anime.role}
                        ></CardHeader>
                        <img
                          src={anime.character.images.jpg.image_url}
                          style={{ maxWidth: "100%" }}
                        ></img>
                      </Card>
                    );
                  })}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Item>
          <Item>
            <Accordion defaultExpanded>
              <AccordionSummary
                aria-controls="panel1-content"
                id="panel2-header"
              >
                Recommendations
              </AccordionSummary>
              <AccordionDetails>
                <Grid container wrap="nowrap" sx={{ overflowX: "scroll" }}>
                  {recommendations.data?.map((anime) => {
                    return <Recommendation anime={anime} setUp={setUp} />;
                  })}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Details;
