const express=require('express');

const app=express();

const port=8000;

app.use('/',require('./routes/index'));


app.listen(port,function(err){

    if(err){

        console.log(`There was an error while running the server ${err}`);

        return;
    }

    console.log(`The server is up and running on port : ${port}`);

});