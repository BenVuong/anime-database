import React, { useState } from "react";
import { CardContent } from "@mui/material";
export function Review({ anime }) {
  const [showMore, setShowMore] = useState(false);
  return (
    <CardContent>
      <div>Score: {anime.score}</div>
      <text>
        {showMore
          ? anime.review
          : `${anime.review.substring(0, 512) + " . . . "}`}
        <button className="btn" onClick={() => setShowMore(!showMore)}>
          {showMore ? "Show Less" : "Show More"}
        </button>
      </text>
    </CardContent>
  );
}
