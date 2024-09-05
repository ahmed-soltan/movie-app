import { useCallback } from "react";

import { toast } from "@/components/ui/use-toast";
import { useUser } from "./use-user";

export const useLocalStorage = () => {
  const { user } = useUser();

  const addMediaToList = useCallback(
    (media: any, ListName: string) => {


      if (!user) {
        if (ListName !== "history") {
          toast({
            title: "Login Required",
            description: "Please log in to add media to your list.",
            variant: "destructive",
          });
        }
        return;
      }

      try {
        const existingListRaw = localStorage.getItem(ListName) || "[]";
        const existingList: any[] = existingListRaw
          ? JSON.parse(existingListRaw)
          : [];

        if (!Array.isArray(existingList)) {
          console.log(
            `The data in localStorage for ${ListName} is not an array.`
          );
        }

        const mediaExists = existingList.some((item) => item.id === media.id);
        if (mediaExists) {
          if (ListName !== "history") {
            toast({
              title: "Already in List",
              description: `This media is already in your ${ListName}`,
              variant: "destructive",
            });
          }
          return;
        }

        if (!mediaExists) {
          existingList.push(media);
          localStorage.setItem(ListName, JSON.stringify(existingList));
          if (ListName !== "history") {
            toast({
              title: "Added Successfully",
              description: `This media is added to your ${ListName} successfully`,
              variant: "success",
            });
          }
        }
      } catch (error) {
        console.error(`Error accessing localStorage for ${ListName}:`, error);
      }
    },
    [user]
  );

  const removeMediaFromList = useCallback(
    (mediaId: string, ListName: string) => {
      try {
        const existingListRaw = localStorage.getItem(ListName);
        const existingList: any[] = existingListRaw
          ? JSON.parse(existingListRaw)
          : [];

        if (!Array.isArray(existingList)) {
          console.log(
            `The data in localStorage for ${ListName} is not an array.`
          );
        }

        const updatedList = existingList.filter(
          (item: any) => item.id !== mediaId
        );
        localStorage.setItem(ListName, JSON.stringify(updatedList));

        toast({
          title: "Removed from List",
          description: `This media is removed from your ${ListName} successfully`,
          variant: "destructive",
        });
      } catch (error) {
        console.error(`Error accessing localStorage for ${ListName}:`, error);
      }
    },
    []
  );

  const getMediaList = useCallback((ListName: string) => {
    try {
      const existingListRaw = localStorage.getItem(ListName);
      const existingList: any[] = existingListRaw
        ? JSON.parse(existingListRaw)
        : [];

      if (!Array.isArray(existingList)) {
        console.log(
          `The data in localStorage for ${ListName} is not an array.`
        );
      }

      return existingList;
    } catch (error) {
      console.error(`Error accessing localStorage for ${ListName}:`, error);
      return [];
    }
  }, []);

  return {
    addMediaToHistory: (media: any) =>
      addMediaToList(media, "history"),
    removeMediaFromHistory: (mediaId: string) =>
      removeMediaFromList(mediaId, "history"),
    getHistory: () => getMediaList("history"),

    addMediaToWatchList: (media: any) =>
      addMediaToList(media, "watchList"),
    removeMediaFromWatchList: (mediaId: string) =>
      removeMediaFromList(mediaId, "watchList"),
    getWatchList: () => getMediaList("watchList"),

    addMediaToFavorites: (media: any) =>
      addMediaToList(media, "favorites"),
    removeMediaFromFavorites: (mediaId: string) =>
      removeMediaFromList(mediaId, "favorites"),
    getFavorites: () => getMediaList("favorites"),
  };
};
