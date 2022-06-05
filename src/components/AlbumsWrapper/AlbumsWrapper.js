import './AlbumsWrapper.scss';

function AlbumsWrapper({ currentLayout, children }) {
  return (
    <div
      className={`
      AlbumsWrapper 
      ${
        currentLayout === 'grid' ? 'AlbumsWrapper--grid' : 'AlbumsWrapper--list'
      }`}
    >
      {children}
    </div>
  );
}

export default AlbumsWrapper;
