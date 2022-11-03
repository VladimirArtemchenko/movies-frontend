import React from "react";
import './Promo.css'

const Promo = () => {
  return (
    <section className="promo">
      <div className="promo__container">
          <h1 className="promo__title">
          Учебный проект студента факультета Веб&#8209;разработки.
          </h1>
          <h2 className="promo__subtitle">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </h2>
          <a href="#info" className="promo__link"><button className="promo__button">Узнать больше</button></a>
      </div>
    </section>
  );
};

export default Promo;
