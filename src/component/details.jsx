import React, { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

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
  const [anime, setAnime] = useState([]);
  const API_URL = "https://api.jikan.moe/v4";

  async function searchAnime(id) {
    const response = await fetch(`${API_URL}/anime/${id}`);
    const data = await response.json();
    setAnime(data.data);
    console.log(data);
    console.log(anime);
  }

  useEffect(() => {
    searchAnime(id);
  }, []);
  return (
    <div>
      Hello {id}
      {anime.title}
    </div>
  );
}

export default Details;
