import { url_film } from './constants';

class MoviesApi {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getAllMovies() {
        return fetch(`${this._baseUrl}/beatfilm-movies`, {
            headers: this._headers,
        }).then(this._checkResponse)
    }
}

const moviesApi = new MoviesApi({
    baseUrl: url_film,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default moviesApi;