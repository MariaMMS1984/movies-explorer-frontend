import './SearchForm.css';
import { useEffect, useState } from 'react';

const SearchFormUser = ({ handleGetMovies, filmsTumbler, filmsInputSearch, handleGetMoviesTumbler }) => {
    const [inputSearch, setInputSearch] = useState('');
    const [tumbler, setTumbler] = useState(false);

    function handleInputChange(evt) {
        setInputSearch(evt.target.value);
    }

    function handleTumblerChange(evt) {
        const newTumbler = !tumbler;
        setTumbler(newTumbler);
        handleGetMoviesTumbler(newTumbler);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        handleGetMovies(inputSearch);
    }

    useEffect(() => {
        setTumbler(filmsTumbler);
        setInputSearch(filmsInputSearch);
    }, [filmsTumbler, filmsInputSearch]);

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

export default SearchFormUser;