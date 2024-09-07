import { useState } from "react";
import { useParams } from "react-router-dom";

import { useMovieDetails } from "@/hooks/movies/use-movie-details";
import { useVideos } from "@/hooks/use-videos";
import { baseImageUrl } from "@/shared/flags";
import VideoPlayer from "@/components/video-player";
import MoviesDetails from "../../components/movies-details";

const MovieDetailsPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const { movieId } = useParams<{ movieId: string }>();
  const { data, loading, error } = useMovieDetails(movieId!);
  const { data: movieVideos } = useVideos("movie", movieId!);

  const handleVideoError = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (movieVideos?.results[newIndex]) {
        return newIndex;
      }
      return prevIndex;
    });
  };

  const handleAutoPlay = () => {
    setAutoPlay(!autoPlay);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data</div>;

  return (
    <div className="text-white">
      <div className="flex flex-col gap-10 p-5">
        {movieVideos && movieVideos.results.length > 0 ? (
          <VideoPlayer
            videoKey={movieVideos?.results[currentIndex]?.key!}
            site={movieVideos?.results[currentIndex]?.site!}
            autoPlay={autoPlay}
            onError={handleVideoError}
            handleAutoPlay={handleAutoPlay}
          />
        ) : (
          <img
            src={`${baseImageUrl}${data.poster_path}`}
            alt={data.original_name}
            className="w-full h-[600px]"
            loading="lazy"

          />
        )}
        <MoviesDetails movie={data} />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
