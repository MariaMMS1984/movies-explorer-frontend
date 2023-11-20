
import { url } from './constants';

class Api {
    constructor({ link }) {
        this._link = link;
    }

    _answerServer(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`код ошибки: ${res.status}`);
        }
    }

    getMovies() {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._link}movies`, {
            headers: { authorization: `Bearer ${token}` },
        })
            .then(res => { return this._answerServer(res); })
    }

    addNewMovie({ name, link }) {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._link}movies`, {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(res => { return this._answerServer(res); })
    }

    deleteMovie(movieId) {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._link}movies/${movieId}`, {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            method: 'DELETE',
        })
            .then(res => { return this._answerServer(res); })
    }

    getUserData() {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._link}users/me`, {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },

        })
            .then(res => { return this._answerServer(res); })
    }

    sendUserData({ name, email }) {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._link}users/me`, {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            method: 'PATCH',
            body: JSON.stringify({ name, email })
        })
            .then(res => { return this._answerServer(res); })
    }

    registerUser({ name, email, password }) {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._link}signup`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        })
            .then(res => { return this._answerServer(res); })
    }

    loginUser({ email, password }) {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._link}signin`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then(res => { return this._answerServer(res); })
    }

}


const api = new Api({
    link: url,
});


export default api;