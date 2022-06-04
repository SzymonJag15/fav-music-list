import './SingleAlbum.scss';

function SingleAlbum({ id, isFavourite, title, remove, addToFavourite }) {
  return (
    <div className="SingleAlbum fade-in">
      <img
        src={`https://source.unsplash.com/random/100x100/?img=${id}`}
        loading="lazy"
        alt="album image"
      />
      <p className="SingleAlbum__title">{title}</p>

      <div className="SingleAlbum__buttons-wrapper">
        <button
          className={isFavourite ? 'favourite favourite--active' : 'favourite'}
          onClick={() => addToFavourite(id)}
        >
          Love
        </button>
        <button className="delete" onClick={() => remove(id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default SingleAlbum;
