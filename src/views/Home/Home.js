import { useState } from 'react';
import './Home.scss';

import AppWrapper from 'components/AppWrapper/AppWrapper';
import AlbumsWrapper from 'components/AlbumsWrapper/AlbumsWrapper';
import SingleAlbum from 'components/SingleAlbum/SingleAlbum';

function Home() {
  const [title, setTitle] = useState('test');
  const [albums, setAlbums] = useState([
    {
      title: 'Test1',
    },
    {
      title: 'Test2',
    },
    {
      title: 'Test3',
    },
  ]);

  const addNewAlbum = (newAlbum) =>
    setAlbums((oldAlbums) => [...oldAlbums, newAlbum]);

  return (
    <div className="Home">
      <AppWrapper>
        <p className="Home__test">{title}</p>
        <AlbumsWrapper>
          {albums.map(({ title }) => (
            <SingleAlbum title={title} />
          ))}
        </AlbumsWrapper>

        <button onClick={() => addNewAlbum({ title: 'test12' })}>
          Add next
        </button>
      </AppWrapper>
    </div>
  );
}

export default Home;
