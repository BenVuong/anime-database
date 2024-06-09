import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Title, Pillar, Item } from "./style";
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
function Characters() {
  const navigate = useNavigate();
  const { id } = useParams();
  const API_URL = "https://api.jikan.moe/v4";
  const [characterInfo, setCharacterInfo] = useState([]);
  const [characterImage, setCharacterImage] = useState("");
  async function getCharacters(id) {
    const response = await fetch(`${API_URL}/characters/${id}/full`);
    const data = await response.json();
    setCharacterInfo(data.data);
    setCharacterImage(data.data.images.jpg.image_url);
    console.log(characterInfo);
  }

  useEffect(() => {
    getCharacters(id);
    console.log(characterInfo);
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid sm={12}>
          <Title>
            {characterInfo.name} {characterInfo.name_kanji}
          </Title>
        </Grid>
        <Grid xs={15} sm={2}>
          <Pillar>
            <Item>
              <img src={characterImage} style={{ maxWidth: "100%" }}></img>
            </Item>
            <Item>
              Animeography:
              <Divider />
              <Item>
                {" "}
                {characterInfo.anime?.map((anime) => {
                  return <div>{anime.anime.title}</div>;
                })}
              </Item>
            </Item>
            <Item>
              Mangaography:
              <Divider />
              <Item></Item>
            </Item>
            <Item>
              <button className="btn btn-info" onClick={() => navigate(-1)}>
                Back
              </button>
            </Item>
          </Pillar>
        </Grid>
        <Grid xs={12} sm={10}>
          <Item className="card-text"> {characterInfo.about}</Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Characters;
