import './UserMovies.css';
import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import api from '../../utils/Api';

const UserMovies = ({ openPopup }) => {
    const [films, setFilms] = useState(null);
    const [filmsSaved, setFilmsSaved] = useState(null);
    const [preloader, setPreloader] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [filmsTumbler, setFilmsTumbler] = useState(false);
    const [filmsInputSearch, setFilmsInputSearch] = useState('');
    const [step, setStep] = useState([]);
    const [filmsShowed, setFilmsShowed] = useState(null);
    const [filmsWithTumbler, setFilmsWithTumbler] = useState([]);
    const [filmsShowedWithTumbler, setFilmsShowedWithTumbler] = useState([]);

    useEffect(() => {
        setStep(getstep());
        const handlerResize = () => setStep(getstep());
        window.addEventListener('resize', handlerResize);

        return () => {
            window.removeEventListener('resize', handlerResize);
        };
    }, []);

    function getstep() {
        let countCards;
        const clientWidth = document.documentElement.clientWidth;
        const stepConfig = {
            '1200': [12, 4],
            '900': [9, 3],
            '768': [8, 2],
            '240': [5, 2],
        };

        Object.keys(stepConfig)
            .sort((a, b) => a - b)
            .forEach((key) => {
                if (clientWidth > +key) {
                    countCards = stepConfig[key];
                }
            });

        return countCards;
    }

    async function handleGetMovies(inputSearch) {
        setFilmsTumbler(false);
        localStorage.setItem('filmsTumbler', false);

        if (!inputSearch) {
            setErrorText('Нужно ввести ключевое слово');
            return false;
        }

        setErrorText('');
        setPreloader(true);

        try {
            const data = await moviesApi.getAllMovies();
            let filterData = data.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()));
            localStorage.setItem('films', JSON.stringify(filterData));
            localStorage.setItem('filmsInputSearch', inputSearch);

            const spliceData = filterData.splice(0, step[0]);
            setFilmsShowed(spliceData);
            setFilms(filterData);
            setFilmsShowedWithTumbler(spliceData);
            setFilmsWithTumbler(filterData);
        } catch (err) {
            setErrorText(
                'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
            );

            setFilms([]);
            localStorage.removeItem('films');
            localStorage.removeItem('filmsTumbler');
            localStorage.removeItem('filmsInputSearch');
        } finally {
            setPreloader(false);
        }
    }

    async function handleGetMoviesTumbler(tumbler) {
        let filterDataShowed = [];
        let filterData = [];

        if (tumbler) {
            setFilmsShowedWithTumbler(filmsShowed);
            setFilmsWithTumbler(films);
            filterDataShowed = filmsShowed.filter(({ duration }) => duration <= 40);
            filterData = films.filter(({ duration }) => duration <= 40);
        } else {
            filterDataShowed = filmsShowedWithTumbler;
            filterData = filmsWithTumbler;
        }

        localStorage.setItem('films', JSON.stringify(filterDataShowed.concat(filterData)));
        localStorage.setItem('filmsTumbler', tumbler);
        setFilmsShowed(filterDataShowed);
        setFilms(filterData);
    }

    async function savedMoviesToggle(film, favorite) {
        if (favorite) {
            const objFilm = {
                image: 'https://api.nomoreparties.co' + film.image.url,
                trailerLink: film.trailerLink,
                thumbnail: 'https://api.nomoreparties.co' + film.image.url,
                movieId: film.id,
                country: film.country || 'Неизвестно',
                director: film.director,
                duration: film.duration,
                year: film.year,
                description: film.description,
                nameRU: film.nameRU,
                nameEN: film.nameEN,
            };
            try {
                await api.addNewMovie(objFilm);
                const newSaved = await api.getMovies();
                setFilmsSaved(newSaved);
            } catch (err) {
                openPopup('Во время добавления фильма произошла ошибка.');
            }
        } else {
            try {
                await api.deleteMovie(film._id);
                const newSaved = await api.getMovies();
                setFilmsSaved(newSaved);
            } catch (err) {
                openPopup('Во время удаления фильма произошла ошибка.');
            }
        }
    }

    useEffect(() => {
        api
            .getMovies()
            .then((data) => {
                setFilmsSaved(data);
            })
            .catch((err) => {
                openPopup(`Ошибка сервера ${err}`);
            });

        const localStorageFilms = localStorage.getItem('films');

        if (localStorageFilms) {
            const filterData = JSON.parse(localStorageFilms);
            setFilmsShowed(filterData.splice(0, getstep()[0]));
            setFilms(filterData);
            setPreloader(false);
        }

        const localStorageFilmsTumbler = localStorage.getItem('filmsTumbler');
        const localStorageFilmsInputSearch = localStorage.getItem('filmsInputSearch');

        if (localStorageFilmsTumbler) {
            setFilmsTumbler(localStorageFilmsTumbler === 'true');
        }

        if (localStorageFilmsInputSearch) {
            setFilmsInputSearch(localStorageFilmsInputSearch);
        }
    }, [openPopup]);

    return (
        <main>
            <div className="usermovies">
                <SearchForm handleGetMovies={handleGetMovies} filmsTumbler={filmsTumbler} filmsInputSearch={filmsInputSearch} />
                {errorText && <div className="usermovies__text-error">{errorText}</div>}
                {!preloader && !errorText && films !== null && (
                    <MoviesCardList filmsRemains={[]} savedMoviesToggle={savedMoviesToggle} films={filmsShowed} />
                )}
            </div>
        </main>
    );
};

export default UserMovies;