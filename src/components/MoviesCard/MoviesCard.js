import "./MoviesCard.css";
import React from "react";
import { useLocation } from "react-router-dom";

const MoviesCard = ({ card }) => {
  const [favorite, setFavorite] = React.useState(false);

  function handleFavoriteToogle() {
    setFavorite(!favorite);
  }

  const { pathname } = useLocation();
  const isSavedMovies = pathname === "/saved-movies"

  return (
    <li className={`card ${isSavedMovies && 'card_active_hover'}`}>
      <div className="card__element">
        <p className="card__title">{card.title}</p>
        <p className="card__duration">{card.duration}</p>
        </div>
      <img src={card.poster} alt={card.title} className="card__image"></img>
      <div className="card__buttons">
          {isSavedMovies ? (
            <button
              type="button"
              className="card__button card__button_delete"
            />
          ) : (
            <button
              type="button"
              className={`card__button card__button${
                favorite ? "_active" : "_inactive"
              }`}
              onClick={handleFavoriteToogle}
            />
          )}
        </div>
    </li>
  );
};

export default MoviesCard;
