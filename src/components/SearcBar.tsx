import React from "react";

interface SearchBarProps {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar: React.FC<SearchBarProps> = ({ searchInput, setSearchInput }) => {

  //Function to update search input state
  const searchMovieTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const userInput : string = e.target.value.toLowerCase();
    setSearchInput(userInput);
  };
  
    return (
      <div className="search-container">
        <input className="search-input" type="text" placeholder="Search..." value={searchInput} onChange={searchMovieTitle} />
      </div>
    )
  };

  export default SearchBar;