import './Profile.css';
import { useState, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUsercontext';
import api from '../../utils/Api';

const Profile = ({ onSignOut, openPopup }) => {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState(currentUser.name);
    const [lastName, setLastName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [lastEmail, setLastEmail] = useState(currentUser.email);
    const [isVisibleButton, setVisibleButton] = useState(false);

    const onSubmit = (evt) => {
        evt.preventDefault();

        api.sendUserData({ name, email }).then(() => {
            setVisibleButton(false);
            setLastName(name);
            setLastEmail(email);
            openPopup('Данные успешно изменены!');
        })
            .catch((err) => {
                openPopup(`Что-то пошло не так! ${err}`);
            });
    };

    function changeName(evt) {
        const value = evt.target.value;
        setName(value);

        if (value !== lastName) {
            setVisibleButton(true);
        } else {
            setVisibleButton(false);
        }
    }

    function changeEmail(evt) {
        const value = evt.target.value;
        setEmail(value);

        if (value !== lastEmail) {
            setVisibleButton(true);
        } else {
            setVisibleButton(false);
        }
    }

    return (
        <section className="profile">
            <form className="profile__form" onSubmit={onSubmit}>
                <h3 className="profile__greeting">Привет, {name}!</h3>
                <div className="profile__inputs">
                    <p className="profile__text">Имя</p>
                    <div className="profile__content profile__content_type_name">
                        <input className="profile__input" minLength="2" value={name} onChange={changeName} />
                    </div>
                    <div className="profile__content profile__content_type_email">
                        <input className="profile__input" value={email} onChange={changeEmail} />
                    </div>
                    <p className="profile__text">E-mail</p>
                </div>
                <button className="profile__button" disabled={!isVisibleButton}>
                    Редактировать
                </button>
                <button className="profile__link" type="button" onClick={onSignOut}>
                    Выйти из аккаунта
                </button>
            </form>
        </section>
    );
};

export default Profile;