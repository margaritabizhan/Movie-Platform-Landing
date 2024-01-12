import React from "react";
import { Movie } from "../types";

interface InfoModalProps {
  selectedMovie: Movie | null;
  setSelectedMovie: React.Dispatch<React.SetStateAction<Movie | null>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const InfoModal: React.FC<InfoModalProps> = ({ selectedMovie, setSelectedMovie, isModalOpen, setIsModalOpen }) => {
  if(!isModalOpen || !selectedMovie) return null;

    //Function to close modal and reset selected movie
    const closeInfoModal = () : void => {
      setIsModalOpen(false);
      setSelectedMovie(null);
    };

  //Again not ideal logic to access picture and display default image if not found
  let modalMovieImage : JSX.Element | null = null;
  const displayPicture = () :void => {
    try {
      modalMovieImage = <img src={require(`../assets/img/wide/${selectedMovie.id}.jpeg`)} alt={selectedMovie.title} className="modal-picture" />
    } catch (e) {
      modalMovieImage = <img src={require(`../assets/img/poster/defaultImage.jpeg`)} alt={selectedMovie.title} className="modal-picture" />
    };
  };
  displayPicture();
  
  //Render a genre for each genre in selectedMovie
  const displayGenres: JSX.Element[] = selectedMovie.genres.map((genre, index) => {
    return (
      <div key={index} className="modal-genre">{genre}</div>
    )
  });

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">{selectedMovie.title}</div>
          <button className="close-button" onClick={closeInfoModal}>x</button>
        </div>
        {modalMovieImage}
        <div className="modal-genre">
          {displayGenres}
        </div>
      </div>
    </div>
  )
};

export default InfoModal;