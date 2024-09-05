import { useMovieReviews } from "@/hooks/movies/use-movie-reviews";
import { useSeriesReviews } from "@/hooks/tv/use-series-reviews";
import { useEffect, useState } from "react";

const useReviewsRating = (mediaId: string, mediaType: "movie" | "series") => {
  const [rating, setRating] = useState<number>(0);

  const { data: movieReviews } = useMovieReviews(parseInt(mediaId));
  const { data: seriesReviews } = useSeriesReviews(parseInt(mediaId));

  useEffect(() => {
    let reviews = mediaType === "movie" ? movieReviews : seriesReviews;

    if (reviews) {
      const totalRating = reviews.results.reduce(
        (acc, review) => acc + review?.author_details?.rating! || 0,
        0
      );
      const avgRating = totalRating / reviews.results.length;
      setRating(avgRating);
    }
  }, [mediaId, mediaType, movieReviews, seriesReviews]);

  return rating;
};

export default useReviewsRating;
