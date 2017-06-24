const jwt = require('jsonwebtoken');
const SECRET_KEY = 'grfe9823yfdqg3f6g217dgw2737';

jwt.sign({ email: 'aaa' }, SECRET_KEY, { expiresIn: 5000 }, (err, token) => console.log(token));

jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFhYSIsImlhdCI6MTQ5ODI3MzM4NSwiZXhwIjoxNDk4Mjc4Mzg1fQ.tJt5PwKehIxQ9giz8zHNcUtLwqpL_7zrdNVveKwkWC0', SECRET_KEY, (err, obj) => {
    console.log(obj);
});
