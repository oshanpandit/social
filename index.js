const express=require('express');

const cookieParser=require('cookie-parser');

const port=8000;

const app=express();

const connectDb=require('./config/mongoose');

connectDb();

const expresslayouts=require('express-ejs-layouts');

app.use(expresslayouts);
 
app.use(cookieParser());

app.use(express.urlencoded());

app.use(express.static('./assets') );

app.use('/',require('./routes/home'));

app.set('view engine','ejs');

app.set('views','./views');



app.listen(port,function(err){

    if(err){

        console.log(`There was an error while running the server ${err}`);

        return;
    }

    console.log(`The server is up and running on port : ${port}`);

});

