import './Page404.css';
import { Link } from 'react-router-dom';

const Page404 = () => {
    return (
        <main>
            <section className="notfound">
                <div className="notfound__container">
                    <h1 className="notfound__title">404</h1>
                    <p className="notfound__text">Страница не найдена</p>
                </div>
                <Link to={-1} className="notfound__link">Назад</Link>
            </section>
        </main>
    );
};

export default Page404;