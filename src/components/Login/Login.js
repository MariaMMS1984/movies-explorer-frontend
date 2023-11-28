import '../Form/Form.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/header_logo.svg';

function Login({ onLogin }) {
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

        onLogin(inputValues);
    };

    return (
        <main>
            <section className="form">
                <div className="form__container">
                    <Link to="/" className="form__link">
                        <img className="form__logo" src={logo} alt="Логотип Movies Explorer"></img>
                    </Link>
                    <h1 className="form__title">Рады видеть!</h1>
                    <form className="form__inputs" onSubmit={formSubmit}>
                        <div className="form__items">
                            <label className="form__item">
                                <span className="form__item-text">E-mail</span>
                                <input
                                    className={`form__field ${errors.email ? 'form__field_color-error' : ''}`}
                                    name="email"
                                    type="email"
                                    placeholder="Введите почту"
                                    value={inputValues.email || ''}
                                    onChange={inputChange}
                                    required
                                />
                                <span className={`form__error ${errors.email ? 'form__error-show' : ''}`}>{errors.email}</span>
                            </label>

                            <label className="form__item">
                                <span className="form__item-text">Пароль</span>
                                <input
                                    className={`form__field ${errors.password ? 'form__field_color-error' : ''}`}
                                    name="password"
                                    type="password"
                                    minLength="6"
                                    maxLength="24"
                                    placeholder="Введите пароль"
                                    value={inputValues.password || ''}
                                    onChange={inputChange}
                                    required
                                />
                                <span className={`form__error ${errors.password ? 'form__error-show' : ''}`}>{errors.password}</span>
                            </label>
                        </div>
                        <button className={`form__button ${isValid ? "" : "form__button_disabled"}`} type="submit" disabled={!isValid ? true : ''}>Войти</button>
                    </form>
                    <p className="form__text">
                        Ещё не зарегистрированы?
                        <Link to="/signup" className="form__link">Регистрация</Link>
                    </p>
                </div>
            </section>
        </main>
    );
}

export default Login;