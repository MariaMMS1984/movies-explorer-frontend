import './UserMovies.css';
import React, { useEffect, useState } from 'react';
import SearchFormUser from '../SearchForm/SearchFormuser';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import api from '../../utils/Api';
import Preloader from '../Preloader/Preloader';
import moviesApi from '../../utils/MoviesApi';
import searchFilter from '../../utils/filter';

const UserMovies = ({ openPopup }) => {
    const [films, setFilms] = useState([]);
    const [preloader, setPreloader] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [filmsTumbler, setFilmsTumbler] = useState(false);
    const [filmsInputSearch, setFilmsInputSearch] = useState('');
    const [filmsShowed, setFilmsShowed] = useState([]);
    const [filmsSaved, setFilmsSaved] = useState(null);
    const [inputSearch, setInputSearch] = useState('');
    const [filmsWithTumbler, setFilmsWithTumbler] = useState([]);
    const [filmsShowedWithTumbler, setFilmsShowedWithTumbler] = useState([]);

    const checkbox = JSON.parse(localStorage.getItem("filmsTumbler"));

    async function handleGetMovies(inputSearch, tumbler) {

        setErrorText('');
        setPreloader(true);

        try {
            const savedMovies = JSON.parse(localStorage.getItem('savedFilms')); // кладем в переменную все фильмы
            console.log(savedMovies);

            let filterData = savedMovies.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()));

            localStorage.setItem('inputSearch', inputSearch);

            let shortData = filterData.filter(({ duration }) => duration <= 40);
            let filterDataShowed = savedMovies.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()));

            const filterShort = filterDataShowed.filter(({ duration }) => duration <= 40);


            if (checkbox) {
                setFilmsShowed(shortData);
            } else {
                setFilmsShowed(filterData);
            }

            if (inputSearch.length > 0) {
                localStorage.setItem('savedFilms', JSON.stringify(filterData));
                localStorage.setItem('savedFilmsShowed', JSON.stringify(filterData));
                localStorage.setItem('savedFilmsTumbler', tumbler);
                localStorage.setItem('inputSearch', inputSearch);
            } else {
                localStorage.removeItem('savedFilms');
                localStorage.removeItem('savedFilmsShowed');
                localStorage.removeItem('savedFilmsTumbler');
                localStorage.removeItem('inputSearch', inputSearch);
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

    async function handleGetMoviesTumbler(tumbler) {
        let filterShowed = [];
        let filterDat = [];

        if (tumbler) {
            setFilmsShowedWithTumbler(filmsShowed);
            setFilmsWithTumbler(films);
            filterShowed = filmsShowed.filter(({ duration }) => duration <= 40);
            filterDat = films.filter(({ duration }) => duration <= 40);
        } else {
            filterShowed = filmsShowedWithTumbler;
            filterDat = filmsWithTumbler;
        }

        setFilmsShowed(filterShowed);
        setFilms(filterDat);
        localStorage.setItem('tumbler', tumbler);
    }


    async function savedMoviesToggle(film, favorite) {
        if (!favorite) {
            try {
                await api.deleteMovie(film._id);
                const newFilms = await api.getMovies();
                const newFilm = await api.getMovies();
                localStorage.setItem('savedFilms', JSON.stringify(newFilms));
                const inputSearch = localStorage.getItem("inputSearch");
                const tumbler = JSON.parse(localStorage.getItem("tumbler"));
                console.log(tumbler);
                console.log(inputSearch);
                const newMovies = searchFilter(newFilm, inputSearch, tumbler);

                setFilmsShowed(newMovies);


            } catch (err) {
                openPopup('Во время удаления фильма произошла ошибка.');
            }
        }
    }

    useEffect(() => {
        api
            .getMovies()
            .then((savedMovies) => {
                const user = localStorage.getItem('userId');
                const userMovies = savedMovies// из всех фильмов выбираем с подходщим id и сохраняем в переменную
                console.log(userMovies);
                localStorage.setItem('savedFilms', JSON.stringify(userMovies)); // сохраняем их в хранилище

                setFilms(userMovies);
                setFilmsSaved(userMovies);
                setFilmsShowed(userMovies);
                localStorage.removeItem('inputSearch');
                if (savedMovies.length === 0) {
                    setErrorText('Вы еще ничего не добавили в избранное');
                }

            })
            .catch((err) => {
                setErrorText((err));
            });
    }, [openPopup]);

    return (
        <div className="usermovies">
            <SearchFormUser handleGetMovies={handleGetMovies} filmsTumbler={filmsTumbler} filmsInputSearch={filmsInputSearch} handleGetMoviesTumbler={handleGetMoviesTumbler} />
            {preloader && <Preloader />}
            {errorText && <div className="usermovies__text-error">{errorText}</div>}
            {!preloader && !errorText && films !== null && (
                <MoviesCardList filmsRemains={[]} savedMoviesToggle={savedMoviesToggle} films={filmsShowed} />
            )}
        </div>
    );
};

export default UserMovies;