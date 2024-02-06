import React, { useState, useEffect } from 'react';
import { Movie, Header, GenreMap } from '../types';
import GenrePanel from './GenrePanel';
import InfoModal from './InfoModal';
import SearchBar from './SearcBar';

const MainContainer: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]); //All movies array that doesn't change
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]); //Filtered movies that will be displayed
  const [masterGenre, setMasterGenre] = useState<GenreMap>({}); //Object that tracks selected genres and selection
  const [isLoading, setIsLoading] = useState<boolean>(true); //Loading state
  const [isError, setIsError] = useState<string | null>(null); //Error state
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null); //Selected movie state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); //Modal state
  const [searchInput, setSearchInput] = useState<string>(''); //Search input state

  //Fetch all movies from API
  const fetchAllMovies = async (): Promise<void> => {
    
    try {
    const response = await fetch('https://margaritabizhan-movieapp.s3.amazonaws.com/movie-list.json', {});
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    };

    //Extracting data from response
    const data = await response.json();
    const fullListMovies: Movie[]= data.data;

    //Store movies in movies state that won't be altered
    setMovies([...fullListMovies]);
    //Set displayed movies
    setFilteredMovies([...fullListMovies]);
    setIsLoading(false);

    //Create a set of all genres with default false to genre selection
    const genreSet: GenreMap = {};
    for (let i: number = 0; i < fullListMovies.length; i++) {
      const movie = fullListMovies[i] as Movie;
      const genres: string[] = movie.genres;
      
      for (let j: number = 0; j < genres.length; j++) {
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

  //Function for genre and serach filtering
  const applyFilters = (): void => {
    //Filter by genre
    //Extract selected genres from masterGenre and store in array
    const selectedGenres: string[] = Object.keys(masterGenre).filter(
      (genre) => masterGenre[genre]
    );
    
    let updateFilteredMovies: Movie[] = [];
    //If no genres are selected, include all movies
    if (selectedGenres.length === 0) {
      updateFilteredMovies = [...movies];
    } else {
    //Filter movies by selected genres
      updateFilteredMovies = movies.filter((movie: Movie) => {
        const genres: string[] = movie.genres;
        for (let i: number = 0; i < genres.length; i++) {
          if (selectedGenres.includes(genres[i])) {
            return true;
          };
        };
        return false;
      });
    };

    //If user input is not empty, search by name
    if(searchInput) {
      const userInput: string = searchInput.toLowerCase();
      updateFilteredMovies = updateFilteredMovies.filter((movie: Movie) => {
        const title: string = movie.title.toLowerCase();
        return title.includes(userInput);
      });
    };
  setFilteredMovies(updateFilteredMovies);
  };

  useEffect(() => {
    applyFilters();
  },[masterGenre, searchInput])

  //Function to open modal and set selected movie
  const handleInfoModal = (movie: Movie): void => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  //Render a movie container for each movie in filteredMovies
  const movieContainer:JSX.Element[] = filteredMovies.map((movie: Movie) => {
    //This try/catch logic is not ideal: stretch goal would be to correct
    try {
      return (
        <div className="movie-item" key={movie.id}>
          <div className="movie-header">
            <div className="movie-title">{movie.title}</div>
              <button className="more-info-button" onClick={() => handleInfoModal(movie)}>ℹ</button>
            </div>
            <img src={require(`../assets/img/poster/${movie.id}.jpeg`)} alt={movie.title} className="movie-poster" />
        </div>
      )
    } catch (e) {
        return (
          <div className="movie-item" key={movie.id}>
            <div className="movie-header">
              <div className="movie-title">{movie.title}</div>
                <button className="more-info-button" onClick={() => handleInfoModal(movie)}>ℹ</button>
            </div>
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
      <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
      <div className="content">
        <div className="genre-panel">
          <GenrePanel masterGenre={masterGenre} setMasterGenre={setMasterGenre} />
        </div>
        <div className="movie-container">
            {filteredMovies.length === 0 ? (
            <div className="sad-cat-container">
              <img src={require(`../assets/img/sad-cat.png`)} alt="Sad Cat" className="sad-cat-img" />
              <p className="not-found-msg">No movies are found, try again...</p>
            </div>
            )
             : movieContainer}
        </div>
      </div>
      <InfoModal selectedMovie ={selectedMovie} setSelectedMovie = {setSelectedMovie} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  )
};

export default MainContainer;