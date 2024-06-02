import React, { useState } from "react";
import { CardContent, Button } from "@mui/material";
import "./../App.css";
export function Review({ anime }) {
  const [showMore, setShowMore] = useState(false);
  return (
    <CardContent>
      <div>Score: {anime.score}</div>
      <div className="card-text">
        {showMore
          ? anime.review
          : `${anime.review.substring(0, 512) + " . . . "}`}
        <Button
          variant="text"
          size="small"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Show Less" : "Show More"}
        </Button>
      </div>
    </CardContent>
  );
}
