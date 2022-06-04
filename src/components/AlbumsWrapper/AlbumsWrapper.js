import './AlbumsWrapper.scss';

function AlbumsWrapper({ currentLayout, children }) {
  return (
    <div
      className={
        currentLayout === 'grid'
          ? 'AlbumsWrapper AlbumsWrapper--grid'
          : 'AlbumsWrapper AlbumsWrapper--list'
      }
    >
      {children}
    </div>
  );
}

export default AlbumsWrapper;
