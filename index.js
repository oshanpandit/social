const express=require('express');

const app=express();

const port=8000;

app.set('view engine','ejs');

app.set('views','./views');

app.use('/',require('./routes/home'));

app.use('/profile',require('./routes/profile'));



app.listen(port,function(err){

    if(err){

        console.log(`There was an error while running the server ${err}`);

        return;
    }

    console.log(`The server is up and running on port : ${port}`);

});

console.log('hello!!');