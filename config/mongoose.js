const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeialGiti_dev', {useNewUrlParser : true, useUnifiedTopology : true, useFindAndModify : false});

const db = mongoose.connection;     

db.on('error', console.error.bind(console, 'Error connecting to mongodb!'));
db.once('open', function(){
    console.log('Connected to database :: MongoDB')
});

module.exports = db;