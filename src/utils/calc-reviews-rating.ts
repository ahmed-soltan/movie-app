import { useState } from "react";

import { useMovieReviews } from "@/hooks/movies/use-movie-reviews";
import { useSeriesReviews } from "@/hooks/tv/use-series-reviews";
import { ReviewsResponse } from "@/types";

export const calcReviewsRating = (
  mediaId: string,
  mediaType: "movie" | "series"
) => {
  const [data, setData] = useState<ReviewsResponse | null>(null);
  if (mediaType === "movie") {
    const { data: movieReviews } = useMovieReviews(parseInt(mediaId));
    setData(movieReviews);
  } else if (mediaType === "series") {
    const { data: seriesReviews } = useSeriesReviews(parseInt(mediaId));
    setData(seriesReviews);
  }
  if (data) {
    const totalRating = data.results.reduce(
      (acc, review) => acc + review?.author_details?.rating! || 0,
      0
    );
    const avgRating = totalRating / data.results.length;
    return avgRating;
  }
  return 0;
};
