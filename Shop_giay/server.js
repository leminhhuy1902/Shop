const express = require("express")
const app = express();
var path = require('path');

var usersRouter = require('./routes/user');
var productsRouter = require('./routes/product');
var indexRouter = require('./routes/index');

var session = require('express-session');

app.listen(3000,function(){
    console.log('Node server running @ http://localhost:3000')
})

app.use(session({
    secret: 'abcdefg',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1200000 }
  }));


app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', usersRouter);
app.use('/', productsRouter);
app.use('/', indexRouter);

app.get('/', (req, res) => {
    res.render('index.ejs', { session : req.session})
})

app.get('/confirm', (req, res) => {
    res.render('confirm.ejs', { session : req.session})
})

app.get('/pay', (req, res) => {
    res.render('payonline.ejs', { session : req.session})
})

app.get('/contact', (req, res) => {
    res.render('contact.ejs', {session: req.session})
})

