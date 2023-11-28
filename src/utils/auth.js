class Auth {
    constructor() {
        this.key = 'jwt';
    }

    getToken() {
        return localStorage.getItem(this.key);
    }

    saveToken(token) {
        localStorage.setItem(this.key, token);
    }

    removeToken() {
        localStorage.removeItem(this.key);
    }
}

const auth = new Auth();

export default auth;