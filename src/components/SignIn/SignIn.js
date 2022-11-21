import "../Form/Form.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import header_logo from "../../images/header_logo.svg";
import isEmail from "validator/es/lib/isEmail";

const Login = ({ signIn }) => {
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
    signIn(formValues);
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
        <h2 className="form__title">Рады видеть!</h2>
        <form className="form__inputs" onSubmit={handleSubmit}>
          <div className="form__items">
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
            Войти
          </button>
        </form>
        <p className="form__text">
          Ещё не зарегистрированы?
          <Link to="/signup" className="form__link">
            Регистрация
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
