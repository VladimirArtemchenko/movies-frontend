import "../Form/Form.css";
import { useState } from "react";
import isEmail from "validator/es/lib/isEmail";
import { Link } from "react-router-dom";
import header_logo from "../../images/header_logo.svg";

const Register = ({ signUp }) => {
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const changeForm = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    if (name === "email") {
      if (!isEmail(value)) {
        evt.target.setCustomValidity("Некорректый адрес почты");
      } else {
        evt.target.setCustomValidity("");
      }
    }
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: evt.target.validationMessage });
    setIsValid(evt.target.closest("form").checkValidity());
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    signUp(formValues);
  };

  return (
    <section className="form">
      <div className="form__container">
        <Link to="/" className="form__link">
          <img
            className="form__logo"
            src={header_logo}
            alt="Логотип Movies Explorer"
          ></img>
        </Link>
        <h2 className="form__title">Добро пожаловать!</h2>
        <form className="form__inputs" onSubmit={handleSubmit}>
          <div className="form__items">
            <label className="form__item">
              <p className="form__item-text">Имя</p>
              <input
                className="form__field"
                name="name"
                placeholder="Введите имя"
                value={formValues.name || ""}
                onChange={changeForm}
                required
              />
              <p className="form__error">Что-то пошло не так...</p>
            </label>

            <label className="form__item">
              <p className="form__item-text">E-mail</p>
              <input
                className={`form__field ${
                  errors.email ? "form__field_color-error" : ""
                }`}
                name="email"
                type="email"
                placeholder="Введите почту"
                value={formValues.email || ""}
                onChange={changeForm}
                required
              />
              <p
                className={`form__error ${
                  errors.email ? "form__error-display" : ""
                }`}
              >
                {errors.email}
              </p>
            </label>

            <label className="form__item">
              <p className="form__item-text">Пароль</p>
              <input
                className={`form__field ${
                  errors.password ? "form__field_color-error" : ""
                }`}
                name="password"
                type="password"
                minLength="6"
                placeholder="Введите пароль"
                value={formValues.password || ""}
                onChange={changeForm}
                required
              />
              <p
                className={`form__error ${
                  errors.password ? "form__error-display" : ""
                }`}
              >
                {errors.password}
              </p>
            </label>
          </div>
          <button
            className={`form__button ${isValid ? "" : "form__button_disabled"}`}
            type="submit"
            disabled={!isValid ? true : ""}
          >
            Зарегистрироваться
          </button>
        </form>
        <p className="form__text">
          Уже зарегистрированы?
          <Link to="/signin" className="form__link">
            Войти
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
