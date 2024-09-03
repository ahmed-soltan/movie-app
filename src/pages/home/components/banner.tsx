import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useMovies } from "@/hooks/use-movies";
import { BannerCard } from "../../../components/cards/banner-card";

export const Banner = () => {
  const { data } = useMovies();

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      className="w-full max-h-[700px] md:max-h-[630px] p-0"
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent
        className="w-full max-h-[700px] md:max-h-[630px] p-0
       flex items-center justify-center"
      >
        {data &&
          data.results &&
          data?.results.map((movie) => (
            <CarouselItem
              key={movie.id}
              className="max-h-[700px] md:max-h-[630px] relative"
            >
              <BannerCard movie={movie} />
            </CarouselItem>
          ))}
      </CarouselContent>
    </Carousel>
  );
};
