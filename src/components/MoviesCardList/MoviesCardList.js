import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = () => {

    return (
        <section className="cards">
            <ul className="cards__list">
                <MoviesCard />
            </ul>
            <div className="cards__text">Ничего не найдено</div>

            <div className="cards__button-container">
                <button className="cards__button" type="button" name="more">Ещё</button>
            </div>
        </section>
    );
};

export default MoviesCardList;