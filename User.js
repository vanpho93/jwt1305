const queryDB = require('./db');
const { hash, compare } = require('bcrypt');
const { getObject, getToken } = require('./jwt');

class User {
    constructor(email, password, name, phone) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.phone = phone;
    }

    static getUserFromToken(token) {
        let userInfo;
        return getObject(token)
        .then(obj => {
            const { email, phone, name } = obj;
            userInfo = { email, phone, name };
            return getToken(userInfo);
        })
        .then(token => {
            userInfo.token = token;
            return userInfo;
        });
    }

    signIn() {
        const sql = 'SELECT * FROM "User" WHERE email = $1';
        let userInfo;
        return queryDB(sql, [this.email])
        .then(result => {
            if (!result.rows[0]) throw new Error('Email khong ton tai');
            const encrypted = result.rows[0].password;
            const { email, phone, name } = result.rows[0];
            userInfo = { email, phone, name };
            return compare(this.password, encrypted);
        })
        .then(same => {
            if (!same) throw new Error('Sai mat khau');
        })
        .then(() => getToken(userInfo))
        .then(token => {
            userInfo.token = token;
            return userInfo;
        });
    }

    signUp() {
        const sql = `INSERT INTO public."User"(
        email, password, name, phone)
        VALUES ($1, $2, $3, $4)`;
        return hash(this.password, 8)
        .then(encrypted => queryDB(sql, [this.email, encrypted, this.name, this.phone]));
    }
}

module.exports = User;

