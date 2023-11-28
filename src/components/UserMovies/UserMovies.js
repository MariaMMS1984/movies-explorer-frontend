import './UserMovies.css';
import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import api from '../../utils/Api';
import Preloader from '../Preloader/Preloader';
import moviesApi from '../../utils/MoviesApi';

const UserMovies = ({ openPopup }) => {
    const [films, setFilms] = useState([]);
    const [preloader, setPreloader] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [filmsTumbler, setFilmsTumbler] = useState(false);
    const [filmsInputSearch, setFilmsInputSearch] = useState('');
    const [filmsShowed, setFilmsShowed] = useState(
        JSON.parse(localStorage.getItem('savedFilms')) || []
    ); // берем фильмы из базы

    async function handleGetMovies(inputSearch, tumbler) {
        setErrorText('');
        setPreloader(true);

        try {
            const data = films;
            let filterData = data.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()));

            if (tumbler) filterData = filterData.filter(({ duration }) => duration <= 40);

            setFilmsShowed(filterData);

            if (inputSearch) {
                localStorage.setItem('savedFilms', JSON.stringify(filterData));
                localStorage.setItem('savedFilmsTumbler', tumbler);
                localStorage.setItem('savedFilmsInputSearch', inputSearch);
            } else {
                localStorage.removeItem('savedFilms');
                localStorage.removeItem('savedFilmsTumbler');
                localStorage.removeItem('savedFilmsInputSearch');
            }

        } catch (err) {
            setErrorText(
                'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
            );

            setFilms([]);
            localStorage.removeItem('savedFilms');
            localStorage.removeItem('savedFilmsTumbler');
            localStorage.removeItem('savedFilmsInputSearch');
        } finally {
            setPreloader(false);
        }
    }

    async function savedMoviesToggle(film, favorite) {
        if (!favorite) {
            try {
                await api.deleteMovie(film._id);
                const newFilms = await api.getMovies();
                setFilmsShowed(newFilms);
                setFilms(newFilms);
            } catch (err) {
                openPopup('Во время удаления фильма произошла ошибка.');
            }
        }
    }

    useEffect(() => {
        userMoviesShow();
    }, []);

    async function userMoviesShow() {
        const localStorageFilms = localStorage.getItem('savedFilms');
        console.log(localStorageFilms);
        if (localStorageFilms) {
            setFilms(JSON.parse(localStorageFilms));
            const localStorageFilmsTumbler = localStorage.getItem('savedFilmsTumbler');
            const localStorageFilmsInputSearch = localStorage.getItem('savedFilmsInputSearch');

            if (localStorageFilmsTumbler) {
                setFilmsTumbler(localStorageFilmsTumbler === 'true');
            }
            if (localStorageFilmsInputSearch) {
                setFilmsInputSearch(localStorageFilmsInputSearch);
            }
        } else {
            try {
                const data = api.getMovies();
                setFilms(data);
                setFilmsShowed(data);
            } catch (err) {
                openPopup(`Ошибка сервера ${err}`);
            }
        }
    }

    return (
        <div className="usermovies">
            <SearchForm handleGetMovies={handleGetMovies} filmsTumbler={filmsTumbler} filmsInputSearch={filmsInputSearch} />
            {preloader && <Preloader />}
            {errorText && <div className="usermovies__text-error">{errorText}</div>}
            {!preloader && !errorText && films !== null && (
                <MoviesCardList filmsRemains={[]} savedMoviesToggle={savedMoviesToggle} films={filmsShowed} />
            )}
        </div>
    );
};

export default UserMovies;