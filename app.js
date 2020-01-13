const express = require('express');
const app = express();
const port = 8002;


// use express router
app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log(`Error listening to port ${port}`);
        return;
    }
    console.log(`Server running on port ${port}`);
});