import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useHistory, withRouter, Navigate, useNavigate } from 'react-router-dom';
import { CurrentUserContext, currentUser } from '../../contexts/CurrentUsercontext';
import Header from '../Header/Header';
import api from '../../utils/Api';
import auth from '../../utils/auth';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Preloader from '../Preloader/Preloader';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import UserMovies from '../UserMovies/UserMovies';
import Page404 from '../Page404/Page404';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import InfotoolTip from '../InfotoolTip/InfoToolTip';

function App() {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { pathname } = useLocation();
    const [popupTitle, setPopupTitle] = useState('');
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        getUserData();
    }, []);

    function getUserData() {
        api.getUserData()
            .then((data) => {
                setCurrentUser(data);
                setLoggedIn(true);
            })
            .catch((err) => {
                console.log(`Что-то пошло не так! Ошибка сервера ${err}`);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }


    function register({ name, email, password }) {
        api.registerUser({ name, email, password })
            .then(() => {
                setPopupTitle("Вы успешно зарегистрировались!");
                setIsOpenPopup(true);
                navigate("/signin");
                login({ name, email, password });
            }).catch(() => {
                setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
                setIsOpenPopup(true);
            });
    }

    function login({ email, password }) {

        api.loginUser({ email, password }).then(({ token }) => {
            if (token) {
                auth.saveToken(token);
                setLoggedIn(true);
                navigate("/movies");
            }
        }).catch(() => {
            setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
            setIsOpenPopup(true);
        });
    }

    function SignOut() {
        auth.removeToken();
        setLoggedIn(false);
        localStorage.removeItem('films');
        localStorage.removeItem('filmsTumbler');
        localStorage.removeItem('filmsInputSearch');
        localStorage.removeItem('savedFilms');
        localStorage.removeItem('savedFilmsTumbler');
        localStorage.removeItem('savedFilmsInputSearch');
        navigate("/");
    }

    function openPopup(textError) {
        setPopupTitle(textError);
        setIsOpenPopup(true);
    }

    function closePopup() {
        setIsOpenPopup(false);
        setPopupTitle('');
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="App">
                {pathname === '/' || pathname === '/movies' || pathname === '/usermovies' || pathname === '/profile' ?
                    <Header loggedIn={loggedIn} isLoading={isLoading} /> : ''}

                <Routes>
                    <Route path="/" element={
                        <>
                            <Main />
                        </>
                    } />
                    <Route
                        path="/movies" element={
                            <>
                                <Movies loggedIn={loggedIn}
                                    isLoading={isLoading}
                                    openPopup={openPopup} />
                            </>
                        } />
                    <Route
                        path="/profile" element={
                            <>
                                <Profile loggedIn={loggedIn}
                                    isLoading={isLoading}
                                    onSignOut={SignOut} openPopup={openPopup} />
                            </>
                        } />

                    <Route
                        path="/usermovies" element={
                            <>
                                <UserMovies loggedIn={loggedIn}
                                    isLoading={isLoading}
                                    openPopup={openPopup} />
                            </>
                        } />

                    <Route path="/signin" element={
                        <>
                            <Login onLogin={login} />
                        </>
                    } />

                    <Route path="/signup" element={
                        <>
                            <Register onRegister={register} />
                        </>
                    } />

                    <Route path="*" element={
                        <>
                            <Page404 />
                        </>
                    } />
                </Routes>
                {pathname === '/' || pathname === '/movies' || pathname === '/usermovies' ? <Footer /> : ''}
                < InfotoolTip text={popupTitle} isOpen={isOpenPopup} onClose={closePopup} />
            </div>
        </CurrentUserContext.Provider>

    );
}

export default App;