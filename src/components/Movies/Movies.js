import './Movies.css';
import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


const Movies = () => {
    return (
        <div className="movies">
            <SearchForm />
            <MoviesCardList />
        </div>
    );
};

export default Movies;