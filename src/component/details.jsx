import { Review } from "./review";
import React, { useEffect, useState, useCallback } from "react";
import { Title, Pillar, Item } from "./style";
import { useParams, Link } from "react-router-dom";
import Recommendation from "./recommendation.jsx";
import "./../App.css";
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

const debounce = (func, delay) => {
  let timeOutID;
  const debouncedFunction = (...args) => {
    if (timeOutID) {
      clearTimeout(timeOutID);
    }
    timeOutID = setTimeout(() => {
      func(...args);
    }, delay);
  };

  debouncedFunction.cancel = () => {
    if (timeOutID) {
      clearTimeout(timeOutID);
    }
  };
  return debouncedFunction;
};

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

  const searchAnime = async (id) => {
    const response = await fetch(`${API_URL}/anime/${id}`);

    if (!response.ok) {
      throw new Error("Request Failed for searchAnime");
    }

    const data = await response.json();
    setAnime(data.data);
    setInfo({
      ...info,
      image: data.data.images.jpg.large_image_url,
      studio: data.data.studios[0].name,
      genres: data.data.genres,
    });
  };

  const getCharacters = async (id) => {
    const response = await fetch(`${API_URL}/anime/${id}/characters`);
    if (!response.ok) {
      throw new Error("Request Failed for getCharacters");
    }
    const data = await response.json();
    setCharacters(data);
  };

  const getReviews = async (id) => {
    const response = await fetch(`${API_URL}/anime/${id}/reviews`);
    if (!response.ok) {
      throw new Error("Request Failed for getReviews");
    }
    const data = await response.json();
    setReview(data);
  };

  const getRecommendations = async (id) => {
    const response = await fetch(`${API_URL}/anime/${id}/recommendations`);

    if (!response.ok) {
      throw new Error("Request Failed for getRecommendations");
    }
    const data = await response.json();
    setRecommendations(data);
  };

  async function setUp(id) {
    await searchAnime(id);
    await new Promise((resolve) => setTimeout(resolve, 100)); // 100ms debounce
    await getReviews(id);
    await new Promise((resolve) => setTimeout(resolve, 100)); // 100ms debounce
    await getRecommendations(id);
    await new Promise((resolve) => setTimeout(resolve, 100)); // 100ms debounce
    await getCharacters(id);
  }

  const debouncedSetUp = useCallback(
    debounce((id) => setUp(id), 300),
    []
  );

  useEffect(() => {
    debouncedSetUp(id);
    return () => {
      debouncedSetUp.cancel();
    };
  }, [debouncedSetUp, id]);

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
              <img src={info.image} style={{ maxWidth: "100%" }} alt="anime" />
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
                  className="btn btn-info"
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
                    <Card key={anime.mal_id}>
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
                Characters and Voice Actors
              </AccordionSummary>
              <AccordionDetails>
                <Grid container wrap="nowrap">
                  {characters.data?.slice(0, 5).map((anime) => {
                    return (
                      <Card key={anime.character.mal_id}>
                        <CardHeader
                          title={anime.character.name}
                          subheader={anime.role}
                        ></CardHeader>
                        <CardContent>
                          {/*Currently just get the first voice actor so launages may be different from each character */}
                          {/*Will add a show more page to see all of the voice actors of each lanuage */}
                          {/* Might add a seperate character page to show full list of voice actors*/}
                          {anime.voice_actors[0].person.name} -{" "}
                          {anime.voice_actors[0].language}
                        </CardContent>
                        <img
                          src={anime.character.images.jpg.image_url}
                          style={{
                            width: "auto",
                            height: "256px",
                          }}
                          alt={anime.character.name}
                        />
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
                id="panel3-header"
              >
                Recommendations
              </AccordionSummary>
              <AccordionDetails>
                <Grid container wrap="nowrap" sx={{ overflowX: "scroll" }}>
                  {recommendations.data?.map((anime) => {
                    return (
                      <Recommendation
                        key={anime.mal_id}
                        anime={anime}
                        setUp={setUp}
                      />
                    );
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
