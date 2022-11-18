import "./MoviesCardList.css";
import React, { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import useScreenWidth from "../../hooks/useScreenWidth";
import { SCREEN_PARAMETERS } from "../../utils/const";
import { getSavedMovieCard } from "../../helpers/helpers";

const MoviesCardList = ({
  filteredMovies,
  savedMoviesList,
  onAdd,
  onDelete,
}) => {
  const location = useLocation();
  const { des, tab, mob } = SCREEN_PARAMETERS;
  const screenWidth = useScreenWidth();
  const [showMovieList, setShowMovieList] = useState([]);
  const [isMount, setIsMount] = useState(true);
  const [showDetails, setShowDetails] = useState({
    total: 12,
    more: 3,
  });
  useEffect(() => {
    if (location.pathname === "/movies") {
      if (screenWidth > des.width) {
        setShowDetails(des.cards);
      } else if (screenWidth <= des.width && screenWidth > mob.width) {
        setShowDetails(tab.cards);
      } else {
        setShowDetails(mob.cards);
      }
      return () => setIsMount(false);
    }
  }, [screenWidth, isMount, des, tab, mob, location.pathname]);
  useEffect(() => {
    if (filteredMovies.length) {
      const res = filteredMovies.filter(
        (item, i) => i < showDetails.total
      );
      setShowMovieList(res);
    }
  }, [filteredMovies, showDetails.total]);
  const getMoreMovies = () => {
    const start = showMovieList.length;
    const end = start + showDetails.more;
    const additional = filteredMovies.length - start;
    if (additional > 0) {
      const newCards = filteredMovies.slice(start, end);
      setShowMovieList([...showMovieList, ...newCards]);
    }
  }
  return (
    <section className="cards">
      <ul className="cards__list">
        {showMovieList.map((movie) => (
          <MoviesCard key={movie.id || movie._id}
          saved={getSavedMovieCard(savedMoviesList, movie)}
          onAdd={onAdd}
          onDelete={onDelete}
          movie={movie} />
        ))}
      </ul>
      {location.pathname === "/movies" &&
        showMovieList.length >= 5 &&
        showMovieList.length < filteredMovies.length &&  (
          <div className="cards__button-container">
            <button
             className="cards__button"
             type="button"
             name="more"
             onClick={getMoreMovies}
            >
              Ещё
            </button>
          </div>
        )}
    </section>
  );
};

export default MoviesCardList;
