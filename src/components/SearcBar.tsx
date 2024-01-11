import React from "react";
import { Movie } from "../types";

interface SearchBarProps {
  movies: Movie[];
  filteredMovies: Movie[];
  setFilteredMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar: React.FC<SearchBarProps> = ({ movies, filteredMovies, setFilteredMovies, searchInput, setSearchInput }) => {

  //Function to update search input state
  const searchMovieTitle = (e: React.ChangeEvent<HTMLInputElement>) : void => {
    const userInput : string = e.target.value.toLowerCase();
    setSearchInput(userInput);

    const searchResultMovies = filteredMovies.filter((movie: Movie) => {
      const title : string = movie.title.toLowerCase();
      return title.includes(userInput);
    });
    setFilteredMovies(searchResultMovies);
  };
  
    return (
      <div className="search-container">
        <input className="search-input" type="text" placeholder="Search..." value={searchInput} onChange={searchMovieTitle} />
      </div>
    )
  };

  export default SearchBar;