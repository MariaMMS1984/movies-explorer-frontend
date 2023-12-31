import './MoviesCardList.css';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({ films, savedMoviesToggle, filmsSaved, filmsRemains, handleMore }) => {
    const { pathname } = useLocation();

    return (
        <section className="cards">
            {films.length > 0 ? (
                <ul className="cards__list">
                    {films.map((film) => (
                        <MoviesCard
                            key={film.id || film.movieId}
                            film={film}
                            savedMoviesToggle={savedMoviesToggle}
                            filmsSaved={filmsSaved}
                        />
                    ))}
                </ul>
            ) : (
                <div className="cards__text">Ничего не найдено</div>
            )}


            <div className="cards__container">
                <button className="cards__button" type="button" name="more" onClick={handleMore}>Ещё</button>
            </div>

        </section>
    );
};

export default MoviesCardList;