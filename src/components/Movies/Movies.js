import './Movies.css';
import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import moviesApi from '../../utils/MoviesApi';
import api from '../../utils/Api';
import searchFilter from '../../utils/filter';


const Movies = ({ openPopup }) => {
    const [films, setFilms] = useState(null);
    const [filmsSaved, setFilmsSaved] = useState(null);
    const [preloader, setPreloader] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [filmsTumbler, setFilmsTumbler] = useState(false);
    const [filmsInputSearch, setFilmsInputSearch] = useState('');
    const [stepCount, setstepCount] = useState([]);
    const [filmsShowed, setFilmsShowed] = useState(null);
    const [filmsWithTumbler, setFilmsWithTumbler] = useState([]);
    const [filmsShowedWithTumbler, setFilmsShowedWithTumbler] = useState([]);

    useEffect(() => {
        setstepCount(getstepCount());
        const handlerResize = () => setstepCount(getstepCount());
        window.addEventListener('resize', handlerResize);

        return () => {
            window.removeEventListener('resize', handlerResize);
        };
    }, []);


    function getstepCount() {
        let countCards;
        const clientWidth = document.documentElement.clientWidth;
        const stepCountConfig = {
            '1284': [12, 4],
            '1004': [12, 3],
            '764': [8, 2],
            '500': [8, 2],
            '240': [5, 2],
        };


        Object.keys(stepCountConfig)
            .sort((a, b) => a - b)
            .forEach((key) => {
                if (clientWidth > +key) {
                    countCards = stepCountConfig[key];
                }
            });

        return countCards;
    }

    function handleMore() {
        const spliceFilms = films;
        const newFilmsShowed = filmsShowed.concat(spliceFilms.splice(0, stepCount[1]));
        setFilmsShowed(newFilmsShowed);
        setFilms(spliceFilms);
    }

    async function handleGetMovies(inputSearch, tumbler) {
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
            let filterDataShowed = data.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()));

            localStorage.setItem('filmsInputSearch', inputSearch);

            localStorage.setItem('films', JSON.stringify(filterData));

            const filterShort = filterDataShowed.filter(({ duration }) => duration <= 40);
            const spliceData = filterData.splice(0, stepCount[0]);
            const tumblerData = filterShort.splice(0, stepCount[0]);
            setFilms(tumblerData);

            if (tumbler) {
                setFilmsShowed(tumblerData);
                setFilmsShowedWithTumbler(spliceData);
                setFilmsWithTumbler(filterData);
            } else {
                setFilmsShowed(spliceData);
                setFilmsShowedWithTumbler(spliceData);
                setFilmsWithTumbler(filterData);
            }

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

    async function savedMoviesToggle(film, favorite) {
        if (favorite) {
            const filmdata = {
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
                owner: film.owner,
            };
            try {
                await api.addNewMovie(filmdata);
                const newSaved = await api.getMovies();
                setFilmsSaved(newSaved);
                localStorage.setItem('savedFilms', JSON.stringify(newSaved));
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
            console.log(filterData);
            setFilmsShowed(filterData.splice(0, getstepCount()[0]));
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
            <div className="movies">
                <SearchForm handleGetMovies={handleGetMovies} filmsTumbler={filmsTumbler} filmsInputSearch={filmsInputSearch} />
                {preloader && <Preloader />}
                {errorText && <div className="movies__text-error">{errorText}</div>}
                {!preloader && !errorText && films !== null && filmsSaved !== null && filmsShowed !== null && (
                    <MoviesCardList handleMore={handleMore} filmsRemains={films} films={filmsShowed} savedMoviesToggle={savedMoviesToggle} filmsSaved={filmsSaved} />
                )}
            </div>
        </main>
    );
};

export default Movies;