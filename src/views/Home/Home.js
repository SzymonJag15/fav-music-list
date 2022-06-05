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
  sortBy,
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
    formState: { isDirty, isValid },
  } = useForm({ mode: 'onChange' });

  const { t } = useTranslation();
  const [albums, setAlbums] = useState([]);
  const [selectedSort, setSelectedSort] = useState('asc');
  const [currentLayout, setCurrentLayout] = useState('grid');
  const [addFormVisible, setAddFormVisible] = useState(false);

  useEffect(() => {
    const albumsFromStorage = JSON.parse(localStorage.getItem('albums'));

    if (!albumsFromStorage) return;
    setAlbums(albumsFromStorage);
  }, []);

  useEffect(() => {
    if (albums.length === 0) return;
    setAlbumsStorage(albums);
    sortBy(selectedSort, setAlbums);
  }, [selectedSort, albums.length]);

  const onSubmit = ({ albumName }) => {
    const newAlbum = {
      id: Math.floor(Math.random() * 100) + 1,
      title: albumName,
      date: Date.parse(new Date()),
      isFavourite: false,
    };

    addNewAlbum(setAlbums, newAlbum, albums);
    setAddFormVisible((old) => !old);
    reset();
  };

  return (
    <div className="Home">
      <AppWrapper>
        <div className="Home__controls-wrapper">
          <div className="title-wrapper">
            <h1 className="title">{t('title')}</h1>
            <button
              className="add-album"
              onClick={() => setAddFormVisible((old) => !old)}
            >
              +
            </button>
            <p className="add-album-title">{t('add-album')}</p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`
              add-album-form 
              ${addFormVisible ? 'add-album-form--visible' : ''}
            `}
          >
            <input
              {...register('albumName', { required: true })}
              className="add-album-form__text-input"
            />
            <input
              type="submit"
              value={t('form.submit')}
              disabled={!isDirty || !isValid}
              className="add-album-form__submit-input"
            />
          </form>

          <AppLanguageSwitcher />
        </div>

        <div className="Home__layout-switch-wrapper">
          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            className="select-sort-input"
          >
            {OPTIONS().map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="buttons">
            <button onClick={() => setCurrentLayout('list')}>
              <List isActive={currentLayout === 'list'} />
            </button>
            <button onClick={() => setCurrentLayout('grid')}>
              <Grid isActive={currentLayout === 'grid'} />
            </button>
          </div>
        </div>

        <AlbumsWrapper currentLayout={currentLayout}>
          {albums.length > 0 ? (
            albums.map(({ id, title, isFavourite }) => (
              <SingleAlbum
                key={id}
                id={id}
                isFavourite={isFavourite}
                title={title}
                currentLayout={currentLayout}
                addToFavourite={() => toggleFavourites(setAlbums, id)}
                remove={() => removeAlbum(setAlbums, id)}
              />
            ))
          ) : (
            <p>Brak albumów.</p>
          )}
        </AlbumsWrapper>
      </AppWrapper>
    </div>
  );
}

export default Home;
