import { useEffect } from "react";

import qs from "query-string";

import { MovieDetails } from "@/types";
import { useLocalStorage } from "@/hooks/use-local-storage";
import RecommendationCard from "../../../../components/cards/recommendation-card";
import { useMovieRecommendations } from "@/hooks/movies/use-movie-recommendations";
import { useMovieReviews } from "@/hooks/movies/use-movie-reviews";
import ReviewCard from "../../../../components/cards/review-card";
import { Button } from "../../../../components/ui/button";
import usePagination from "@/hooks/use-pagination";
import MovieDetailsCard from "@/pages/movies/components/movie-details-card";

interface MoviesDetailsProps {
  movie: MovieDetails;
}

const MoviesDetails = ({ movie }: MoviesDetailsProps) => {
  const { page, nextPage } = usePagination();

  const params = qs.stringify({ page });

  const { addMediaToHistory } = useLocalStorage();
  const { data: movieRecommendation } = useMovieRecommendations(
    parseInt(movie.id)
  );
  const { data: movieReviews } = useMovieReviews(parseInt(movie.id), params);

  useEffect(() => {
    addMediaToHistory(movie);
  }, []);

  const handleShowMoreReviews = () => {
    nextPage();
  };

  return (
    <div className="flex flex-col items-start gap-8">
      <MovieDetailsCard movie={movie}/>
      <div className="flex items-start gap-8 flex-wrap-reverse lg:flex-nowrap w-full">
        <div className="w-full flex flex-col items-start gap-5">
          <h1 className="text-3xl bg-[#1c1c1c] p-5 w-full rounded-sm">Movie Reviews</h1>
          <div className="flex flex-col items-start gap-5 mt-5">
            {movieReviews && movieReviews.results.length > 0 ? (
              movieReviews.results.map((review) => (
                <ReviewCard review={review} key={review.id} />
              ))
            ) : (
              <div className="w-full text-[#777]">
                No Reviews Found For This Movie
              </div>
            )}
          </div>
          {movieReviews && movieReviews?.total_pages > 1 && (
            <Button
              variant={"primary"}
              onClick={handleShowMoreReviews}
              className=""
            >
              Show More Reviews
            </Button>
          )}
        </div>
        <div className="flex flex-col items-start gap-5 w-full lg:w-[350px] ml-auto">
          <h1 className="text-3xl bg-[#1c1c1c] p-5 w-full rounded-sm">Recommended Movies</h1>
          {movieRecommendation &&
            movieRecommendation
              .slice(0, 10)
              .map((recommendation) => (
                <RecommendationCard
                  key={recommendation.id}
                  recommendation={recommendation!}
                  mediaType="movie"
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesDetails;
