import { useEffect } from "react";

import qs from "query-string";

import { useLocalStorage } from "@/hooks/use-local-storage";
import RecommendationCard from "../../../components/cards/recommendation-card";

import ReviewCard from "../../../components/cards/review-card";
import { Button } from "../../../components/ui/button";
import usePagination from "@/hooks/use-pagination";
import { useSeriesRecommendations } from "@/hooks/tv/use-series-recommendations";
import { useSeriesReviews } from "@/hooks/tv/use-series-reviews";
import SeriesDetailsCard from "@/app/tv/components/SeriesDetailsCard";
import AdditionalSeriesDetailsCard from "@/app/tv/components/AdditionalSeriesDetailsCard";

interface SeriesDetailsProps {
  series: any;
}

const SeriesDetails = ({ series }: SeriesDetailsProps) => {
  const { page, nextPage } = usePagination();

  const params = qs.stringify({ page });

  const { addMediaToHistory } = useLocalStorage();
  const { data: seriesRecommendation } = useSeriesRecommendations(
    series.id
  );
  const { data: seriesReviews } = useSeriesReviews(series.id, params);

  useEffect(() => {
    addMediaToHistory(series);
  }, []);

  const handleShowMoreReviews = () => {
    nextPage();
  };

  return (
    <div className="flex flex-col items-start gap-8">
      <SeriesDetailsCard series={series}/>
      <AdditionalSeriesDetailsCard series={series}/>
      <div className="flex items-start gap-8 flex-wrap-reverse lg:flex-nowrap w-full">
        <div className="w-full flex flex-col items-start gap-5">
          <h1 className="text-3xl bg-[#1c1c1c] p-5 w-full rounded-sm">series Reviews</h1>
          <div className="flex flex-col items-start gap-5 mt-5">
            {seriesReviews && seriesReviews.results.length > 0 ? (
              seriesReviews.results.map((review) => (
                <ReviewCard review={review} key={review.id} />
              ))
            ) : (
              <div className="w-full text-[#777]">
                No Reviews Found For This series
              </div>
            )}
          </div>
          {seriesReviews && seriesReviews?.total_pages > 1 && (
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
          <h1 className="text-3xl bg-[#1c1c1c] p-5 w-full rounded-sm">Recommended Series</h1>
          {seriesRecommendation &&
            seriesRecommendation
              .slice(0, 10)
              .map((recommendation) => (
                <RecommendationCard
                  key={recommendation.id}
                  recommendation={recommendation!}
                  mediaType="series"
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default SeriesDetails;
