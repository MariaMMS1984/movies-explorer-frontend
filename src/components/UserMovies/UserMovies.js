import './UserMovies.css';
import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


const UserMovies = () => {
    return (
        <div className="usermovies">
            <SearchForm />
            <MoviesCardList />
        </div>
    );
};

export default UserMovies;