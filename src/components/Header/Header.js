import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/header__logo.png';
import NavTab from '../Navtab/Navtab';
import Navigation from '../Navigation/Navigation';

const Header = ({ loggedIn, isLoading }) => {
    const { pathname } = useLocation();

    return (
        <header className={`header ${pathname !== '/' ? '' : 'header__auth'}`}>
            <Link to="/" className="header__link">
                <img className="header__logo" src={logo} alt="Логотип"></img>
            </Link>
            {isLoading ? '' : loggedIn ? <Navigation /> : <NavTab />}
        </header>
    );
};

export default Header;