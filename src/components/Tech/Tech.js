import "./Tech.css";

const tech = () => {
  return (
    <section className="tech">
      <div className="tech__container">
        <h2 className="tech__title">Технологии</h2>
        <h3 className="tech__quantity">7 технологий</h3>
        <p className="tech__about">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="tech__stack">
          <li className="tech__stack-item">
            <p className="tech__stack-name">HTML</p>
          </li>
          <li className="tech__stack-item">
            <p className="tech__stack-name">CSS</p>
          </li>
          <li className="tech__stack-item">
            <p className="tech__stack-name">JS</p>
          </li>
          <li className="tech__stack-item">
            <p className="tech__stack-name">React</p>
          </li>
          <li className="tech__stack-item">
            <p className="tech__stack-name">Git</p>
          </li>
          <li className="tech__stack-item">
            <p className="tech__stack-name">Express.js</p>
          </li>
          <li className="tech__stack-item">
            <p className="tech__stack-name">mongoDB</p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default tech;
