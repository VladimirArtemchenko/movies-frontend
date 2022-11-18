import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { filtering, filteringShort } from "../../helpers/helpers";
import "./SavedMovies.css";

const SavedMovies = ({ onDelete, savedMoviesList, setIsInfoModal }) => {
  const currentUser = useContext(CurrentUserContext);
  const [isShort, setIsShort] = useState(false);
  const [NotFound, setNotFound] = useState(false);
  const [showedMovies, setShowedMovies] = useState(savedMoviesList);
  const [filteredMovies, setFilteredMovies] = useState(showedMovies);
  useEffect(() => {
    if (
      localStorage.getItem(`${currentUser.email} - shortSavedMovies`) === "true"
    ) {
      setIsShort(true);
      setShowedMovies(filteringShort(savedMoviesList));
    } else {
      setIsShort(false);
      setShowedMovies(savedMoviesList);
    }
  }, [savedMoviesList, currentUser]);

  useEffect(() => {
    setFilteredMovies(savedMoviesList);
    savedMoviesList.length !== 0 ? setNotFound(false) : setNotFound(true);
  }, [savedMoviesList]);

  const handleSearchSubmit = (inputValue) => {
    const moviesList = filtering(savedMoviesList, inputValue, isShort);
    if (moviesList.length === 0) {
      setNotFound(true);
      setIsInfoModal({isOpen: true,successful: false,text: "Ничего не найдено.",
      });
    } else {
      setNotFound(false);
      setFilteredMovies(moviesList);
      setShowedMovies(moviesList);
    }
  }

  const getShortFilms = () => {
    if (!isShort) {
      setIsShort(true);
      localStorage.setItem(`${currentUser.email} - shortSavedMovies`, true);
      setShowedMovies(filteringShort(filteredMovies));
      filteringShort(filteredMovies).length === 0
        ? setNotFound(true)
        : setNotFound(false);
    } else {
      setIsShort(false);
      localStorage.setItem(`${currentUser.email} - shortSavedMovies`, false);
      filteredMovies.length === 0 ? setNotFound(true) : setNotFound(false);
      setShowedMovies(filteredMovies);
    }
  }

  return (
    <main className="movies">
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        getShortFilms={getShortFilms}
        isShort={isShort}
      />
      {!NotFound && (
        <MoviesCardList
          filteredMovies={showedMovies}
          savedMoviesList={savedMoviesList}
          onDelete={onDelete}
        />
      )}
    </main>
  );
};

export default SavedMovies;
