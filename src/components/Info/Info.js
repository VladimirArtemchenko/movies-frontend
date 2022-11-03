import React from "react";
import './Info.css';

const AboutProject = () => {
  return (
    <section id={"info"} className="info">
      <div className="info__container">
        <h2 className="info__title">О проекте</h2>
        <ul className="info__definition-list">
          <li className="info__definition-item">
            <h3 className="info__definition-title">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="info__definition-description">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </li>

          <li className="info__definition-item">
            <h3 className="info__definition-title">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="info__definition-description">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <div className="info__scheme">
          <div className="info__backend">
            <span className="info__backend-duration">1 неделя</span>
            <span className="info__scheme-title">Back-end</span>
          </div>
          <div className="info__frontend">
            <span className="info__frontend-duration">4 недели</span>
            <span className="info__scheme-title">Front-end</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutProject;
