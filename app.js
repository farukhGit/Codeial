const express = require('express');
const app = express();
const port = 8002;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');


app.set('view engine', 'ejs');
app.set('views', './views');

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