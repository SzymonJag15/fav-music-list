import Star from 'assets/svg/Star/Star';
import Trash from 'assets/svg/Trash/Trash';

import './SingleAlbum.scss';

function SingleAlbum({
  id,
  isFavourite,
  title,
  remove,
  addToFavourite,
  currentLayout,
}) {
  return (
    <div
      className={
        currentLayout === 'grid'
          ? 'SingleAlbum SingleAlbum--grid'
          : 'SingleAlbum SingleAlbum--list'
      }
    >
      <img
        src={`https://source.unsplash.com/random/100x100/?img=${id}`}
        loading="lazy"
        alt="album image"
        className="SingleAlbum__image"
      />
      <p className="SingleAlbum__title">{title}</p>

      <div className="SingleAlbum__buttons-wrapper">
        <button className={'favourite'} onClick={() => addToFavourite(id)}>
          <Star isActive={isFavourite} />
        </button>
        <button className="delete" onClick={() => remove(id)}>
          <Trash />
        </button>
      </div>
    </div>
  );
}

export default SingleAlbum;
