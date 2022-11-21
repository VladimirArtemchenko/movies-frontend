import {  useEffect, useContext,useState } from "react";
import { useLocation } from "react-router-dom";
import Filter from "../Filter/Filter";
import useFormWithValidation from "../../hooks/useFormValidation";
import CurrentUserContext from "../../context/CurrentUserContext";
import "./SearchForm.css";

const SearchForm = ({ handleSearchSubmit, getShortFilms, isShort }) => {
  const location = useLocation();
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange } = useFormWithValidation();
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem(`${currentUser.email} - movieSearch`)
    ) {
      const searchValue = localStorage.getItem(
        `${currentUser.email} - movieSearch`
      );
      values.search = searchValue;
    }
  }, [currentUser]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target[0].value) {
        e.target[0].setCustomValidity("Нужно ввести ключевое слово");
        setErrors({ ...errors, [e.target[0].name]: e.target[0].validationMessage });
        return
      } else {
        e.target[0].setCustomValidity("");
        setErrors({ ...errors, [e.target[0].name]: e.target[0].validationMessage });
    }
    handleSearchSubmit(values.search);
  }
  return (
    <section className="search">
       <label className="form__item">
        <form
        className="search__form"
        name="search"
        noValidate
        onSubmit={handleSubmit}
      >

        <input
          className="search__input"
          name="search"
          type="text"
          placeholder="Фильм"
          autoComplete="off"
          value={values.search || ""}
          onChange={handleChange}
          required
        />
        <button className="search__button" type="submit"></button>

      </form>
      <p
                className={`form__error ${
                  errors.search ? "form__error-display" : ""
                }`}
              >
                {errors.search}
              </p>

       </label>

      <Filter
        isShort={isShort}
        getShortFilms={getShortFilms}
      />
    </section>
  );
};

export default SearchForm;
