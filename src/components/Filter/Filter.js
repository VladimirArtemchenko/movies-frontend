import React from "react";
import "./Filter.css";

const Filter = ({ isShort, getShortFilms }) => {
  return (
    <label className="filter">
      <span className="filter__text">Короткометражки</span>
      <input className="filter__checkbox"
        type="checkbox"
        onChange={getShortFilms}
        checked={isShort ? true : false} />
      <span className="filter__tumbler"></span>
    </label>
  );
};

export default Filter;
