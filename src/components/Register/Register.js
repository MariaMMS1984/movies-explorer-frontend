import '../Form/Form.css';
import logo from '../../images/header_logo.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
    const [inputValues, setInputValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const inputChange = (evt) => {
        const target = evt.target;
        const name = target.name;
        const value = target.value;

        setInputValues({ ...inputValues, [name]: value });
        setErrors({ ...errors, [name]: target.validationMessage });
        setIsValid(target.closest('form').checkValidity());
    };

    const formSubmit = (evt) => {
        evt.preventDefault();

        onRegister(inputValues);
    };

    return (
        <section className="form">
            <div className="form__container">
                <Link to="/" className="form__link">
                    <img className="form__logo" src={logo} alt="Логотип Movies Explorer"></img>
                </Link>
                <h2 className="form__title">Добро пожаловать!</h2>
                <form className="form__inputs" onSubmit={formSubmit}>
                    <div className="form__items">
                        <label className="form__item">
                            <p className="form__item-text">Имя</p>
                            <input className="form__field" name="name" placeholder="Введите имя" value={inputValues.name || ''} onChange={inputChange} required />
                            <p className="form__error">Что-то пошло не так...</p>
                        </label>

                        <label className="form__item">
                            <p className="form__item-text">E-mail</p>
                            <input
                                className={`form__field ${errors.email ? 'form__field_color-error' : ''}`}
                                name="email"
                                type="email"
                                placeholder="Введите почту"
                                value={inputValues.email || ''}
                                onChange={inputChange}
                                required
                            />
                            <p className={`form__error ${errors.email ? 'form__error-show' : ''}`}>{errors.email}</p>
                        </label>

                        <label className="form__item">
                            <p className="form__item-text">Пароль</p>
                            <input
                                className={`form__field ${errors.password ? 'form__field_color-error' : ''}`}
                                name="password"
                                type="password"
                                minLength="6"
                                placeholder="Введите пароль"
                                value={inputValues.password || ''}
                                onChange={inputChange}
                                required
                            />
                            <p className={`form__error ${errors.password ? 'form__error-show' : ''}`}>{errors.password}</p>
                        </label>
                    </div>
                    <button className={`form__button ${isValid ? "" : "form__button_disabled"}`} type="submit" disabled={!isValid ? true : ''}>Зарегистрироваться</button>
                </form>
                <p className="form__text">
                    Уже зарегистрированы?
                    <Link to="/signin" className="form__link">Войти</Link>
                </p>
            </div>
        </section>
    );
}

export default Register;