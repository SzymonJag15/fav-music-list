import './SingleAlbum.scss';

function SingleAlbum({ title }) {
  return (
    <div className="SingleAlbum">
      <img
        src="https://source.unsplash.com/random/100x100/?img=1"
        loading="lazy"
      />
      <p className="SingleAlbum__title">{title}</p>
    </div>
  );
}

export default SingleAlbum;
