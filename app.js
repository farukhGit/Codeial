const express = require('express');
const app = express();
const port = 8002;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const mongoStore = require('connect-mongo')(session);

app.use(express.urlencoded());
app.use(cookieParser());


app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name : 'codeial',
    secret : 'secretkey',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000 * 60 * 100)
    },
    store : new mongoStore({
        mongooseConnection : db,
        autoRemove : 'disabled'
    }, (err)=>{
        console.log(err || 'connect-mongodb setup ok');
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// define path of static files
app.use(express.static('./assets'));

// use ejs-layouts  
app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// use express router
app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log(`Error listening to port ${port}`);
        return;
    }
    console.log(`Server running on port ${port}`);
});