import React from "react";
import { Grid, Card, CardContent, CardHeader } from "@mui/material";
function Recommendation({ anime, setUp }) {
  return (
    <Grid item xs={4}>
      <Card>
        <CardHeader
          title={anime.entry.title}
          style={{ maxWidth: "100%" }}
        ></CardHeader>
        <CardContent>
          <img src={anime.entry.images.jpg.image_url} />
          <button
            className="btn btn-info "
            onClick={() => {
              setUp(anime.entry.mal_id);
            }}
          >
            Details
          </button>
        </CardContent>
      </Card>
    </Grid>
  );
}
export default Recommendation;
