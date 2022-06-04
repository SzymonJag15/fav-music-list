import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import AppWrapper from 'components/AppWrapper/AppWrapper';
import AlbumsWrapper from 'components/AlbumsWrapper/AlbumsWrapper';
import SingleAlbum from 'components/SingleAlbum/SingleAlbum';

import {
  setAlbumsStorage,
  addNewAlbum,
  sortItemsByAZ,
  sortItemsByZA,
  sortItemsByDateDsc,
  sortItemsByDateAsc,
  sortItemsByID,
  toggleFavourites,
  removeAlbum,
} from 'utils/albums';

import { OPTIONS } from 'consts/albumsSort';

import './Home.scss';

function Home() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [albums, setAlbums] = useState([]);
  const [selectedSort, setSelectedSort] = useState('');

  useEffect(() => {
    const albumsFromStorage = JSON.parse(localStorage.getItem('albums'));

    if (!albumsFromStorage) return;
    setAlbums(albumsFromStorage);
  }, []);

  useEffect(() => {
    setAlbumsStorage(albums);

    if (albums.length === 0) return;
    switch (selectedSort) {
      case 'az':
        sortItemsByAZ(setAlbums);
        break;
      case 'za':
        sortItemsByZA(setAlbums);
        break;
      case 'asc':
        sortItemsByDateAsc(setAlbums);
        break;
      case 'dsc':
        sortItemsByDateDsc(setAlbums);
        break;
      case 'id':
        sortItemsByID(setAlbums);
        break;
      default:
        sortItemsByDateAsc(setAlbums);
    }
  }, [selectedSort, albums.length]);

  const onSubmit = ({ albumName }) => {
    const newAlbum = {
      id: Math.floor(Math.random() * 100) + 1,
      title: albumName,
      date: Date.parse(new Date()),
      isFavourite: false,
    };

    addNewAlbum(setAlbums, newAlbum, albums);
    reset();
  };

  return (
    <div className="Home">
      <AppWrapper>
        <AlbumsWrapper>
          {albums.map(({ id, title, isFavourite }) => (
            <SingleAlbum
              key={id}
              id={id}
              isFavourite={isFavourite}
              title={title}
              addToFavourite={() => toggleFavourites(setAlbums, id)}
              remove={() => removeAlbum(setAlbums, id)}
            />
          ))}
        </AlbumsWrapper>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('albumName', { required: true })} />
          {errors.albumName && <span>This field is required</span>}

          <input type="submit" value="Add" disabled={errors.albumName} />
        </form>

        <select
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
        >
          {OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </AppWrapper>
    </div>
  );
}

export default Home;
