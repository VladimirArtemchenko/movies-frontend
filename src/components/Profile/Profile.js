import "./Profile.css";
import { useState, useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

const Profile = ({ signOut, editInfo }) => {
  const currentUser = useContext(CurrentUserContext);
  const [email, setEmail] = useState(currentUser.email);
  const [lastEmail, setLastEmail] = useState(currentUser.email);
  const [name, setName] = useState(currentUser.name);
  const [lastName, setLastName] = useState(currentUser.name);
  const [isVisibleButton, setVisibleButton] = useState(false);
  const changeName = (evt) => {
    const value = evt.target.value;
    setName(value);
    if (value !== lastName) {
      setVisibleButton(true);
    } else {
      setVisibleButton(false);
    }
  }
  const changeEmail = (evt) => {
    const value = evt.target.value;
    setEmail(value);
    if (value !== lastEmail) {
      setVisibleButton(true);
    } else {
      setVisibleButton(false);
    }
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();
    editInfo({ name, email });
    setVisibleButton(false);
    setLastName(name);
    setLastEmail(email);
  }

  return (
    <section className="profile">
      <form className="profile__form" onSubmit={handleSubmit}>
        <h3 className="profile__greeting">Привет, {name}!</h3>
        <div className="profile__inputs">
          <p className="profile__text">Имя</p>
          <div className="profile__area profile__area_type_name">
            <input
              className="profile__settings"
              value={name}
              onChange={changeName}
            />
          </div>
          <div className="profile__area profile__area_type_email">
            <input
              className="profile__settings"
              value={email}
              onChange={changeEmail}
            />
          </div>
          <p className="profile__text">E-mail</p>
        </div>
        <button className="profile__button" disabled={!isVisibleButton}>
          Редактировать
        </button>
        <button className="profile__link" type="button" onClick={signOut}>
          Выйти из аккаунта
        </button>
      </form>
    </section>
  );
};

export default Profile;
