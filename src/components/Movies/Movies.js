import "./Movies.css";
import { useState, useContext, useEffect } from "react";
import {movieApi} from "../../utils/MoviesApi";
import CurrentUserContext from "../../context/CurrentUserContext";
import {  formatData, filtering, filteringShort,} from "../../helpers/helpers.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
export default function Movies({
  setIsLoading,
  setInfoModal,
  savedMoviesList,
  onAdd,
  onDelete,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [initialMovies, setInitialMovies] = useState([]);
  const [isShort, setIsShort] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isAllMovies, setIsAllMovies] = useState([]);
  const [NotFound, setNotFound] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - isShort`) === "true") {
      setIsShort(true);
    } else {
      setIsShort(false);
    }
  }, [currentUser]);

  useEffect(() => {

    if (localStorage.getItem(`${currentUser.email} - movies`)) {
      const movies = JSON.parse(
        localStorage.getItem(`${currentUser.email} - movies`)
      );
      setInitialMovies(movies);
      if (
        localStorage.getItem(`${currentUser.email} - isShort`) === "true"
      ) {
        setFilteredMovies(filteringShort(movies));
      } else {
        setFilteredMovies(movies);
      }
    } else {
      handleSearchSubmit("");
    }
  }, [currentUser]);

  const handleSetFilteredMovies = (movies, query, isFiltering) => {
    const moviesList = filtering(movies, query, isFiltering);
    if (moviesList.length === 0) {
      setInfoModal({isOpen: true,successful: false,text: "Ничего не найдено.",});
      setNotFound(true);
    } else {
      setNotFound(false);
    }
    setInitialMovies(moviesList);
    setFilteredMovies(
      isFiltering ? filteringShort(moviesList) : moviesList
    );
    localStorage.setItem(
      `${currentUser.email} - movies`,
      JSON.stringify(moviesList)
    );
  }

  const handleSearchSubmit = (inputValue) => {
    if(!inputValue) return
    localStorage.setItem(`${currentUser.email} - movieSearch`, inputValue);
    localStorage.setItem(`${currentUser.email} - isShort`, isShort);
    if (isAllMovies.length === 0) {
      setIsLoading(true);
      movieApi
        .getMovies()
        .then((movies) => {
          setIsAllMovies(movies);
          handleSetFilteredMovies(
            formatData(movies),
            inputValue,
            isShort
          );
        })
        .catch(() =>
          {setInfoModal({
            isOpen: true,
            successful: false,
            text: "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.",
          })}
        )
        .finally(() => setIsLoading(false));
    } else {
      handleSetFilteredMovies(isAllMovies, inputValue, isShort);
    }
  }

  const getShortFilms = () => {
    setIsShort(!isShort);
    if (!isShort) {
      setFilteredMovies(filteringShort(initialMovies));
    } else {
      setFilteredMovies(initialMovies);
    }
    localStorage.setItem(`${currentUser.email} - isShort`, !isShort);
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
          filteredMovies={filteredMovies}
          savedMoviesList={savedMoviesList}
          onAdd={onAdd}
          onDelete={onDelete}
        />
      )}
    </main>
  );
}
