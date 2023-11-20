import './AboutMe.css';
import avatar from '../../images/avatar.png';

const AboutMe = () => {
    return (
        <section className="about-me">
            <h2 className="about-me__header">Студент</h2>

            <div className="about-me__container">
                <div className="about-me__info">
                    <h3 className="about-me__name">Мария</h3>
                    <p className="about-me__job">Фронтенд-разработчик, 39 лет</p>
                    <p className="about-me__description">
                        В условиях увеличения роли компьютерных технологий, появления все новых инструментов, позволяющих облегчить жизнь обычных людей, сделать более удобные для пользователя приложения и сервисы, прошла обучение в сфере веб-разработки, создала проекты под задачи бизнеса и делающие жизнь пользователя приятнее, кроме того прошла обучение в сфере аналитики данных с помощью Python и машинного обучения.
                        В настоящее время мечтаю лично приложить руку к разработке новых и усовершенствованию существующих сайтов, приложений, сервисов.
                    </p>

                    <ul className="about-me__links">
                        <li><a className="about-me__link" href="https://github.com/MariaMMS1984" target="_blank" rel="noreferrer">Github</a></li>
                    </ul>
                </div>

                <img src={avatar} alt="about-me" className="about-me__image" />
            </div>
        </section>
    );
};

export default AboutMe;