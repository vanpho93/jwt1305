const queryDB = require('./db');
const { hash, compare } = require('bcrypt');

class User {
    constructor(email, password, name, phone) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.phone = phone;
    }

    signIn() {

    }

    signUp() {
        const sql = `INSERT INTO public."User"(
        email, password, name, phone)
        VALUES ($1, $2, $3, $4)`;
        return hash(this.password, 8)
        .then(encrypted => queryDB(sql, [this.email, encrypted, this.name, this.phone]));
    }
}

const user = new User('vanpho01@gmail.com', '123', 'Pho Nguyen', '01694472176');
