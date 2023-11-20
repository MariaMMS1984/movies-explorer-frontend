import './MoviesCard.css';
const MoviesCard = () => {


  const MoviesCard = () => {
    return (
      <li className="card">
        <a className="card__image-content" target="_blank" rel="noreferrer">
          <img className="card__image" ></img>
        </a>
        <div className="card__element">
          <p className="card__title"></p>
          <div className="card__buttons">
            <button type="button" className="card__button card__button_delete" />
            <button type="button" className="card__button card__button_active" />
          </div>
        </div>
        <p className="card__duration"></p>
      </li>
    );
  };
};

export default MoviesCard;