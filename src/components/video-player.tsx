import React, { useEffect, useState } from "react";

interface VideoProps {
  videoKey: string;
  site: string;
  autoPlay: boolean;
  onError: () => void;
  handleAutoPlay: () => void;
}

const VideoPlayer: React.FC<VideoProps> = ({
  videoKey,
  site,
  autoPlay,
  onError,
  handleAutoPlay,
}) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (site === "YouTube") {
      setVideoUrl(
        `https://www.youtube.com/embed/${videoKey}?autoplay=${autoPlay ? 1 : 0}`
      );
    }
  }, [videoKey, site, autoPlay]);

  const handleIframeError = () => {
    setError(true);
    onError();
  };

  const handleIframeLoad = () => {
    setError(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      onError();
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      {error ? (
        <p>Failed to load video. Please try again later.</p>
      ) : (
        <iframe
          id={`youtube-player-${videoKey}`}
          width="100%"
          height="700px"
          src={videoUrl}
          title="Video Player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onError={handleIframeError}
          onLoad={handleIframeLoad}
        ></iframe>
      )}
    </div>
  );
};

export default VideoPlayer;
