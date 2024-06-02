import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./../App.css";
function Characters() {
  const { id } = useParams();
  const API_URL = "https://api.jikan.moe/v4";
  const [characterInfo, setCharacterInfo] = useState([]);
  async function getCharacters(id) {
    const response = await fetch(`${API_URL}/characters/${id}/full`);
    const data = await response.json();
    setCharacterInfo(data.data);
  }

  useEffect(() => {
    getCharacters(id);
    console.log(characterInfo);
  }, []);
  return (
    <div>
      {characterInfo.name}
      <div className="card-text">{characterInfo.about}</div>
    </div>
  );
}

export default Characters;
