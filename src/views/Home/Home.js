import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import AppWrapper from 'components/AppWrapper/AppWrapper';
import AppLanguageSwitcher from 'components/AppLanguageSwitcher/AppLanguageSwitcher';
import AlbumsWrapper from 'components/AlbumsWrapper/AlbumsWrapper';
import SingleAlbum from 'components/SingleAlbum/SingleAlbum';

import Grid from 'assets/svg/Grid/Grid';
import List from 'assets/svg/List/List';

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

  const { t } = useTranslation();
  const [albums, setAlbums] = useState([]);
  const [selectedSort, setSelectedSort] = useState('');
  const [currentLayout, setCurrentLayout] = useState('grid');

  useEffect(() => {
    const albumsFromStorage = JSON.parse(localStorage.getItem('albums'));

    if (!albumsFromStorage) return;
    setAlbums(albumsFromStorage);
  }, []);

  useEffect(() => {
    if (albums.length === 0) return;
    setAlbumsStorage(albums);

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
      date: new Date(),
      isFavourite: false,
    };

    addNewAlbum(setAlbums, newAlbum, albums);
    reset();
  };

  return (
    <div className="Home">
      <AppWrapper>
        <div className="Home__controls-wrapper">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('albumName', { required: true })} />
            {errors.albumName && <span>{t('errors.required-file')}</span>}

            <input type="submit" value="Add" disabled={errors.albumName} />
          </form>

          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
          >
            {OPTIONS().map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div>
            <div className="Home__layout-switch-wrapper">
              <button onClick={() => setCurrentLayout('grid')}>
                <Grid isActive={currentLayout === 'grid'} />
              </button>
              <button onClick={() => setCurrentLayout('list')}>
                <List isActive={currentLayout === 'list'} />
              </button>
            </div>

            <AppLanguageSwitcher />
          </div>
        </div>

        <AlbumsWrapper currentLayout={currentLayout}>
          {albums.map(({ id, title, isFavourite }) => (
            <SingleAlbum
              key={id}
              id={id}
              isFavourite={isFavourite}
              title={title}
              currentLayout={currentLayout}
              addToFavourite={() => toggleFavourites(setAlbums, id)}
              remove={() => removeAlbum(setAlbums, id)}
            />
          ))}
        </AlbumsWrapper>
      </AppWrapper>
    </div>
  );
}

export default Home;
