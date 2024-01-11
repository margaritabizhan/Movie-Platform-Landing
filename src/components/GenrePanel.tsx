import React, { useState, useEffect } from 'react';
import { GenreMap, Movie } from '../types';


interface GenrePanelProps {
  masterGenre: GenreMap;
  setMasterGenre: React.Dispatch<React.SetStateAction<GenreMap>>;
  movies: Movie[];
  filteredMovies: Movie[];
  setFilteredMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const GenrePanel: React.FC<GenrePanelProps> = ({ masterGenre, setMasterGenre, movies, filteredMovies, setFilteredMovies }) => {

  // Function to toggle the selected state of a genre
  const toggleGenre = (genre: string): void => {
    const updatedGenreMap = {...masterGenre, [genre]: !masterGenre[genre]};
    setMasterGenre(updatedGenreMap);
  };

  useEffect(() => {
    //Extract selected genres from masterGenre
    const selectedGenres : string[] = Object.keys(masterGenre).filter(
      (genre) => masterGenre[genre]
    );

    if (selectedGenres.length === 0) {
      //If no genres are selected, display all movies
      setFilteredMovies([...movies]);
    } else {
      //Filter movies by selected genres
      const filtered = movies.filter((movie) => {
        const genres = movie.genres;
        for (let i = 0; i < genres.length; i++) {
          if (selectedGenres.includes(genres[i])) {
            return true;
          }
        }
        return false;
      });
      setFilteredMovies(filtered);
    };
  },[masterGenre]);
  
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