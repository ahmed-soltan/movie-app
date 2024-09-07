import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";

import { MediaItemCard } from "@/components/cards/media-item-card";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-local-storage";

const WatchListPage = () => {
  const [data, setData] = useState<any>([]);
  const { getWatchList, removeMediaFromWatchList } = useLocalStorage();

  const deleteMedia = (mediaId: string) => {
    const updatedList = removeMediaFromWatchList(mediaId);

    setData(updatedList);
  };

  useEffect(() => {
    const watch = getWatchList();
    setData(watch);
  }, []);

  return (
    <div className="flex flex-col items-start gap-5 w-full">
      <h1 className="text-3xl text-white font-semibold text-center">
        Your Watch List
      </h1>
      <div className="flex items-center justify-center lg:justify-start gap-3 flex-wrap w-full">
        {data && data.length > 0 ? (
          data.map((watch: any) => {
            const isSeries = !!watch.seasons;
            return (
              <div className="relative">
                <MediaItemCard
                  media={watch}
                  key={watch.id}
                  path={isSeries ? "/tv/series" : "/movies"}
                />
                <Button
                  variant={"destructive"}
                  className="absolute right-0 -top-2 rounded-full py-0 px-3"
                  onClick={() => deleteMedia(watch.id)}
                >
                  <FiTrash2 className="w-4 h-4" />
                </Button>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center w-full gap-3">
            <h1 className="text-[#999]">
              You Have not added any Movies to your Watch List yet.
            </h1>
            <Button asChild variant={"primary"}>
              <a href="/movies">Start Browsing Movies and TV Shows Now!</a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchListPage;
