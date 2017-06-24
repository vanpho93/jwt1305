const jwt = require('jsonwebtoken');
const SECRET_KEY = 'grfe9823yfdqg3f6g217dgw2737';

// jwt.sign({ email: 'aaa' }, SECRET_KEY, { expiresIn: 5000 }, (err, token) => console.log(token));

// jwt.verify('eyJhbGhdCI6MTQ5ODI3ehIxQ9giz8zHNceKwkWC0', SECRET_KEY, (err, obj) => {
//     console.log(obj);
// });

function getObject(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET_KEY, (err, obj) => {
            if (err) return reject(err);
            resolve(obj);
        });
    });
}

function getToken(obj) {
    return new Promise((resolve, reject) => {
        jwt.sign(obj, SECRET_KEY, { expiresIn: 5000 }, (err, token) => {
            if (err) return reject(err);
            resolve(token);
        });
    });
}

// getToken({ msg: 'Thanh cong' })
// .then(token => console.log(token))
// .catch(err => console.log(err.toString()));

// getObject('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtc2ciOiJUaGFuaCBjb25nIiwiaWF0IjoxNDk4Mjc0MjE4LCJleHAiOjE0OTgyNzkyMTh9.W6Alu9M_iVtK6gU9PY0EPPZ-mvsIC5WcLT57YW9FjFw')
// .then(obj => console.log(obj));

module.exports = { getObject, getToken };  
