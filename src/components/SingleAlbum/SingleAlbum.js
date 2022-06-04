import './SingleAlbum.scss';

function SingleAlbum({ id, title, remove }) {
  return (
    <div className="SingleAlbum fade-in">
      <img
        src={`https://source.unsplash.com/random/100x100/?img=${id}`}
        loading="lazy"
      />
      <p className="SingleAlbum__title">{title}</p>

      <div className="SingleAlbum__buttons-wrapper ">
        <button className="favourite">Love</button>
        <button className="delete" onClick={() => remove(id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default SingleAlbum;
