import React from "react";
import { Movie } from "../types";

interface InfoModalProps {
  selectedMovie: Movie | null;
  setSelectedMovie: React.Dispatch<React.SetStateAction<Movie | null>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  closeInfoModal: () => void;
};

const InfoModal: React.FC<InfoModalProps> = ({ selectedMovie, setSelectedMovie, isModalOpen, setIsModalOpen, closeInfoModal }) => {
  if(!isModalOpen || !selectedMovie) return null;


  let modalMovieImage : JSX.Element | null = null;
  const displayPicture = () :void => {
    try {
      modalMovieImage = <img src={require(`../assets/img/wide/${selectedMovie.id}.jpeg`)} alt={selectedMovie.title} className="modal-picture" />
    } catch (e) {
     modalMovieImage = <img src={require(`../assets/img/poster/defaultImage.jpeg`)} alt={selectedMovie.title} className="modal-picture" />
    };
  };
  displayPicture();
  
  const displayGenres: JSX.Element[] = selectedMovie.genres.map((genre) => {
    return (
      <div key={genre} className="modal-genre">{genre}</div>
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