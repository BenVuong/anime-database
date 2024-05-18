import React, { useEffect, useState } from "react";

function Homepage() {
  const [animeData, setAnimeData] = useState([]);
  const [title, setTitle] = useState("");
  const API_URL = "https://api.jikan.moe/v4";

  const getTopAnime = async () => {
    const response = await fetch(`${API_URL}/top/anime`);
    setAnimeData(await response.json());
    console.log(animeData);
  };

  useEffect(() => {
    getTopAnime();
  }, []);

  return (
    <div>
      <button onClick={getTopAnime}>top anime</button>
      {title}

      {animeData.data?.map((anime, index) => {
        return (
          <tr key={index}>
            <td>{anime.title_english}</td>
          </tr>
        );
      })}
    </div>
  );
}
export default Homepage;
