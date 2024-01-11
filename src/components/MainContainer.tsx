import React, { useState, useEffect } from 'react';
import { Movie, Header, GenreMap } from '../types';
import GenrePanel from './GenrePanel';

const MainContainer = () => {
  const [movies, setMovies] = useState<Movie[]>([]); //All movies array that doesn't change
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]); //Filtered movies that will be displayed
  const [masterGenre, setMasterGenre] = useState<GenreMap>({}); //Object that tracks selected genres and selection
  const [isLoading, setIsLoading] = useState<boolean>(true); //Loading state
  const [isError, setIsError] = useState<string | null>(null); //Error state

  //Fetch all movies from API
  const fetchAllMovies = async () => {
    const headers: Header = {'Authorization': 'Api-Key q3MNxtfep8Gt'};
    
    try {
    const response = await fetch('https://code-challenge.spectrumtoolbox.com/api/movies', { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    //Extracting data from response
    const data = await response.json();
    const fullListMovies = data.data;

    //Store movies in movies state that won't be altered
    setMovies([...fullListMovies]);
    //Set displayed movies
    setFilteredMovies([...fullListMovies]);
    setIsLoading(false);

    //Create a set of all genres with default false to genre selection
    const genreSet: GenreMap = {};
    for (let i = 0; i < fullListMovies.length; i++) {
      const movie = fullListMovies[i];
      const genres = movie.genres;
      
      for (let j = 0; j < genres.length; j++) {
        const genre = genres[j];
        genreSet[genre] = false;
      };
    };

    setMasterGenre(genreSet);

    //Error handling for fetch
    } catch (e) {
      console.log('Error: fetching data ', e);
      setIsError('Whoooops! Something went wrong!');
      setIsLoading(false);
    };
  };

  useEffect(() => {
    fetchAllMovies();
  }, []);

  //Render a movie container for each movie in filteredMovies
  const movieContainer:JSX.Element[] = filteredMovies.map((movie: Movie) => {
    //This try/catch logic is not ideal: stretch goal would be to correct
    try {
      return (
        <div className="movie-item" key={movie.id}>
          <div className="movie-title">{movie.title}</div>
          <img src={require(`../assets/img/poster/${movie.id}.jpeg`)} alt={movie.title} className="movie-poster" />
        </div>
      )
    } catch (e) {
        return (
          <div className="movie-item" key={movie.id}>
            <div className="movie-title">{movie.title}</div>
            <img src={require(`../assets/img/poster/defaultImage.jpeg`)} alt={movie.title} className="movie-poster" />
          </div>
        )
    };
  });

  return (
    <div className = "main-container">
      <div className="loading">
        {isLoading ? <p>Loading...</p> : null}
        {isError ? <p>{isError}</p> : null}
      </div>
      <div className="content">
        <div className="genre-panel">
          <GenrePanel masterGenre={masterGenre} setMasterGenre={setMasterGenre} movies={movies} filteredMovies={filteredMovies} setFilteredMovies={setFilteredMovies} />
        </div>
        <div className="movie-container">
            {movieContainer}
        </div>
      </div>
    </div>
  )
};

export default MainContainer;