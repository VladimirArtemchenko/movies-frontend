import "./MoviesCard.css";
import React from "react";
import { useLocation } from "react-router-dom";
import { transformDuration } from "../../helpers/helpers";

const MoviesCard = ({ movie, saved, onDelete, onAdd }) => {
  const location = useLocation();
  const isSavedMovies = location.pathname === "/saved-movies";
  const handleDelete = () => {
    onDelete(movie);
  }
  const handleAdd = () => {
    onAdd(movie);
  }
  return (
    <li className={`card ${isSavedMovies && 'card_active_hover'}`}>
        <div className="card__element">
        <p className="card__title">{movie.nameRU}</p>
        <p className="card__duration">{transformDuration(movie.duration)}</p>
        </div>
        <a target="_blank" rel="noreferrer" href={movie.trailerLink}>
      <img
          src={movie.image}
          alt={movie.nameRU}
          title={`Описание: ${movie.description} \n\nСнято: ${movie.country} ${movie.year}г.`}
          className="card__image"
          ></img>
          </a>
      <div className="card__buttons">
          {isSavedMovies ? (
            <button
              type="button"
              className="card__button card__button_delete"
              onClick={handleDelete}
              aria-label="Удалить фильм из сохранённых"
            />) : (
            <button
              type="button"
              onClick={saved ? handleDelete : handleAdd}
              className={`card__button card__button${
                saved ? "_active" : "_inactive"
              }`}
              aria-label={`${
                saved ? "Удалить фильм из сохранённых" : "Сохранить фильм"
              }`}
            />
          )}
        </div>
    </li>
  );
};

export default MoviesCard;
