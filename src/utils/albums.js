export const setAlbumsStorage = (albums) =>
  localStorage.setItem('albums', JSON.stringify(albums));

export const addNewAlbum = (setterAlbums, newAlbum, albums) => {
  setterAlbums((oldAlbums) => [...oldAlbums, newAlbum]);
  setAlbumsStorage(albums);
};

export const sortItemsByAZ = (setterAlbums) => {
  setterAlbums((oldAlbums) => {
    const sortedAlbums = [
      ...oldAlbums.sort((a, b) => a.title.localeCompare(b.title)),
    ];
    setAlbumsStorage(sortedAlbums);
    return sortedAlbums;
  });
};

export const sortItemsByZA = (setterAlbums) => {
  setterAlbums((oldAlbums) => {
    const sortedAlbums = [
      ...oldAlbums.sort((a, b) => b.title.localeCompare(a.title)),
    ];
    setAlbumsStorage(sortedAlbums);
    return sortedAlbums;
  });
};

export const sortItemsByDateDsc = (setterAlbums) => {
  setterAlbums((oldAlbums) => {
    const sortedAlbums = [...oldAlbums.sort((a, b) => b.date - a.date)];
    setAlbumsStorage(sortedAlbums);
    return sortedAlbums;
  });
};

export const sortItemsByDateAsc = (setterAlbums) => {
  setterAlbums((oldAlbums) => {
    const sortedAlbums = [...oldAlbums.sort((a, b) => a.date - b.date)];
    setAlbumsStorage(sortedAlbums);
    return sortedAlbums;
  });
};

export const sortItemsByID = (setterAlbums) => {
  setterAlbums((oldAlbums) => {
    const sortedAlbums = [...oldAlbums.sort((a, b) => a.id - b.id)];
    setAlbumsStorage(sortedAlbums);
    return sortedAlbums;
  });
};

export const toggleFavourites = (setterAlbums, id) => {
  setterAlbums((oldAlbums) => {
    const newAlbumsArray = [
      ...oldAlbums.map((album) =>
        album.id === id ? { ...album, isFavourite: !album.isFavourite } : album
      ),
    ];
    setAlbumsStorage(newAlbumsArray);
    return newAlbumsArray;
  });
};

export const removeAlbum = (setterAlbums, id) => {
  setterAlbums((oldAlbums) => {
    const newAlbumsArray = [...oldAlbums.filter((album) => album.id !== id)];
    setAlbumsStorage(newAlbumsArray);
    return newAlbumsArray;
  });
};
