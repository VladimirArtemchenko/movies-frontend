import React from "react";
import "./FilterCheckbox.css";

const FilterCheckbox = () => {
  return (
    <label className="filter">
      <span className="filter__text">Короткометражки</span>
      <input className="filter__checkbox" type="checkbox" />
      <span className="filter__tumbler"></span>
    </label>
  );
};

export default FilterCheckbox;
