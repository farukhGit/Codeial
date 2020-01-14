const express = require('express');
const app = express();
const port = 8002;
const expressLayouts = require('express-ejs-layouts');


app.set('view engine', 'ejs');
app.set('views', './views');

// use ejs-layouts  
app.use(expressLayouts);

// use express router
app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log(`Error listening to port ${port}`);
        return;
    }
    console.log(`Server running on port ${port}`);
});