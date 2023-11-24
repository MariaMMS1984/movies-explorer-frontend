import './Navigation.css';
import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Navigation = () => {
    const [showItems, setShowItems] = useState(false);
    const { pathname } = useLocation();
    const toggleMenu = () => setShowItems(!showItems);

    return (
        <nav className="navigation">
            <button className="navigation__button-menu" type="button" onClick={toggleMenu}></button>
            <div className={`navigation__container ${showItems ? 'navigation__container_visible' : ''}`}>
                <div className="navigation__panel">
                    <div className="navigation__list-container">
                        <button className="navigation__button-close" type="button" onClick={toggleMenu}></button>
                        <ul className="navigation__list">
                            <li className="navigation__item navigation__item_type_main">
                                <Link to="/" className={`navigation__link ${pathname !== '/' ? '' : 'navigation__link_active'}`}>Главная</Link>
                            </li>
                            <li className="navigation__item">
                                <NavLink to="/movies" className={`navigation__link ${pathname !== '/movies' ? '' : 'navigation__link_active'}`}>Фильмы</NavLink>
                            </li>
                            <li className="navigation__item">
                                <NavLink to="/usermovies" className={`navigation__link ${pathname !== '/usermovies' ? '' : 'navigation__link_active'}`}>Сохранённые фильмы</NavLink>
                            </li>
                        </ul>
                    </div>
                    <Link to="/profile" className="navigation__link navigation__link_type_profile">Аккаунт</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;