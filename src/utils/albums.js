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
    const sortedAlbums = [
      ...oldAlbums.sort((a, b) => {
        console.log(b.date + a.date);
        return b.date + a.date;
      }),
    ];
    setAlbumsStorage(sortedAlbums);
    return sortedAlbums;
  });
};

export const sortItemsByDateAsc = (setterAlbums) => {
  setterAlbums((oldAlbums) => {
    const sortedAlbums = [
      ...oldAlbums.sort((a, b) => {
        console.log(b.date - a.date);
        return b.date - a.date;
      }),
    ];
    setAlbumsStorage(sortedAlbums);
    return sortedAlbums;
  });
};

export const removeAlbum = (setterAlbums, id, albums) => {
  setterAlbums((oldAlbums) => [
    ...oldAlbums.filter((album) => album.id !== id),
  ]);
  setAlbumsStorage(albums);
};
