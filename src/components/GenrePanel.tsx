import React from 'react';
import { GenreMap } from '../types';


interface GenrePanelProps {
  masterGenre: GenreMap;
  setMasterGenre: React.Dispatch<React.SetStateAction<GenreMap>>;
};

const GenrePanel: React.FC<GenrePanelProps> = ({ masterGenre, setMasterGenre }) => {

  // Function to toggle the selected state of a genre
  const toggleGenre = (genre: string): void => {
    const updatedGenreMap: GenreMap = {...masterGenre, [genre]: !masterGenre[genre]};
    setMasterGenre(updatedGenreMap);
  };
  
  //Render a button for each genre in masterGenre
  const genreButtons : JSX.Element[] = [];
  for (const key in masterGenre) {
    const isGenreSelected : boolean = masterGenre[key];
    const buttonClass : string = isGenreSelected ? 'active-button' : 'not-active-button';
    genreButtons.push(
      <li key={key}>
      <button className={`button ${buttonClass}`}
        onClick={() => toggleGenre(key)}>
        {key}
      </button>
      </li>
    ); 
  }

  return (
    <div className="genre-panel">
      <h3>Genres</h3>
      <div className="genre-buttons">
        <ul>
        {genreButtons}
        </ul>
      </div>
    </div>
  );
};

export default GenrePanel;