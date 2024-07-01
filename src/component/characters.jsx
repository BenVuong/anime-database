import React, { useCallback, useEffect, useState } from "react";
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

function Characters() {
  const navigate = useNavigate();
  const { id } = useParams();
  const API_URL = "https://api.jikan.moe/v4";
  const [characterInfo, setCharacterInfo] = useState([]);
  const [characterImage, setCharacterImage] = useState("");
  const [arrayOfImages, setArrayOfImages] = useState([]);
  const getCharacterInfo = async (id) => {
    const response = await fetch(`${API_URL}/characters/${id}/full`);
    if (!response.ok) {
      throw new Error("Request failed for getCharacterInfo");
    }
    const data = await response.json();
    setCharacterInfo(data.data);
    setCharacterImage(data.data.images.jpg.image_url);
    console.log(characterInfo);
  };

  const getCharacterImages = async (id) => {
    const response = await fetch(`${API_URL}/characters/${id}/pictures`);
    if (!response.ok) {
      throw new Error("Request failed for getCharactersImages");
    }
    const data = await response.json();
    setArrayOfImages(data.data);
    console.log(arrayOfImages);
  };

  const setUp = async (id) => {
    try {
      await getCharacterInfo(id);

      await getCharacterImages(id);
    } catch (err) {
      throw new Error("Request failed in setUp");
    }
  };

  const debouncedSetUp = useCallback(
    debounce((id) => setUp(id), 10),
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
          <Divider />
          <Item>
            <Accordion defaultExpanded>
              <AccordionSummary
                aria-controls="panel1-content"
                id="panel1-header"
              >
                Voice Actors
              </AccordionSummary>
              <AccordionDetails>
                {characterInfo.voices?.map((voices) => {
                  return (
                    <Item>
                      {voices.language} - {voices.person.name}
                    </Item>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          </Item>
          <Item>
            <Accordion defaultExpanded>
              <AccordionSummary
                aria-controls="panel1-content"
                id="panel1-header"
              >
                Character Images
              </AccordionSummary>
              <AccordionDetails>
                <Grid container wrap="nowrap" sx={{ overflowX: "scroll" }}>
                  {arrayOfImages.map((image) => {
                    return (
                      <Item>
                        <img
                          src={image.jpg.image_url}
                          style={{
                            width: "auto",
                            height: "256px",
                          }}
                        ></img>
                      </Item>
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

export default Characters;
