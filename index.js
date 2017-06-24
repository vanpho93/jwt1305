const express = require('express');
const jsonParser = require('body-parser').json();
const User = require('./User');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

app.get('/', (req, res) => res.render('home'));

//route dang ky

//route dang nhap
app.post('/signin', jsonParser, (req, res) => {
    const { email, password } = req.body;
    const user = new User(email, password);
    user.signIn()
    .then(userInfo => res.send(userInfo))
    .catch(err => res.send({ error: 'LOI_DANG_NHAP' }));
});


app.listen(3000, () => console.log('Server started!'));

//khoapham123