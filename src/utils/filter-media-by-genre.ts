export const filterMediaByGenre = (genreId: string, mediaList: any[]) => {
    return mediaList.filter((media) =>
      media.genre_ids.includes(parseInt(genreId)) 
    );
  };
  
  