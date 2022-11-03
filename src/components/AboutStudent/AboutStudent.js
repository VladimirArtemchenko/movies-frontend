import "./AboutStudent.css";
import avatar from "../../images/Avatar.jpg";

const AboutStudent = () => {
  return (
    <section className="about-student">
      <div className="about-student__container">
        <h2 className="about-student__title">Студент</h2>
        <div className="about-student__bio-container">
          <div className="about-student__bio">
            <h3 className="about-student__name">Владимир</h3>
            <p className="about-student__age">Фронтенд-разработчик, 32 года</p>
            <p className="about-student__text">
            Я живу в Омске, закончил факультет управления на железнодорожном транспорте СГУПСа. У меня есть жена.
            Я люблю единоборства, а ещё увлекаюсь стрельбой из пистолета. Недавно начал програмировать.
            С 2012 года работал в компании ОАО «РЖД». После того, как прошёл курс по веб-разработке,
            дополнительно устроился в студию ООО "Аддамант".
            </p>
            <ul className="about-student__socials">
              <li>
                <a
                  href="https://github.com/VladimirArtemchenko"
                  target="_blank"
                  rel="noreferrer"
                  className="about-student__social-link"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
          <img
            className="about-student__avatar"
            src={avatar}
            alt="фотография разработчика приложения"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutStudent;
