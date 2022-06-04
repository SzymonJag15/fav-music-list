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

  const onSubmit = ({ albumName }) => {
    const newAlbum = {
      id: Math.floor(Math.random() * 100) + 1,
      title: albumName,
      date: Date.parse(new Date()),
    };

    addNewAlbum(setAlbums, newAlbum, albums);
    reset();
  };

  useEffect(() => {
    const albumsFromStorage = JSON.parse(localStorage.getItem('albums'));

    if (!albumsFromStorage) return;
    setAlbums(albumsFromStorage);
  }, []);

  useEffect(() => {
    setAlbumsStorage(albums);

    if (albums.length === 0) return;
    if (selectedSort === 'az') return sortItemsByAZ(setAlbums);
    if (selectedSort === 'za') return sortItemsByZA(setAlbums);
    if (selectedSort === 'asc') return sortItemsByDateAsc(setAlbums);
    if (selectedSort === 'dsc') return sortItemsByDateDsc(setAlbums);
  }, [selectedSort, albums.length]);

  return (
    <div className="Home">
      <AppWrapper>
        <AlbumsWrapper>
          {albums.map(({ id, title }) => (
            <SingleAlbum
              key={id}
              id={id}
              title={title}
              remove={() => removeAlbum(setAlbums, id, albums)}
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
