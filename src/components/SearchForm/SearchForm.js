import './SearchForm.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SearchForm = ({ handleGetMovies }) => {
    const [inputSearch, setInputSearch] = useState('');
    const [tumbler, setTumbler] = useState(false);
    const { pathname } = useLocation();
    const [filmsTumbler, setFilmsTumbler] = useState(false);
    const [filmsInputSearch, setFilmsInputSearch] = useState('');


    function handleInputChange(evt) {
        setInputSearch(evt.target.value);
    }

    const handleTumblerChange = () => {
        setTumbler(!tumbler);
        handleGetMovies(inputSearch, !tumbler);
        if (pathname === '/movies') {
            localStorage.setItem('filmsTumbler', !tumbler);
        }
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        if (pathname === '/movies') {
            localStorage.setItem('filmsInputSearch', inputSearch);
        }
        handleGetMovies(inputSearch, tumbler);
    }


    useEffect(() => {
        if (pathname === '/movies') {
            const inputData = localStorage.getItem('filmsInputSearch');
            const checkbox = JSON.parse(localStorage.getItem('filmsTumbler'));
            if (inputData) {
                setInputSearch(inputData);
            }
            if (checkbox) {
                setTumbler(checkbox);
            }
        }
    }, []);

    return (
        <form className="search">
            <div className="search__container">
                <input className="search__input" placeholder="Фильм" type="text" value={inputSearch || ''} onChange={handleInputChange} required />
                <button type="submit" className="search__button" onClick={handleSubmit}></button>
            </div>
            <div className="search__toggle">
                <label className="search__tumbler">

                    <input className="search__checkbox" type="checkbox" value={tumbler} checked={tumbler} onChange={handleTumblerChange} />

                    <span className="search__slider" />
                </label>
                <p className="search__shortfilms">Короткометражки</p>
            </div>
        </form>
    );
};

export default SearchForm;