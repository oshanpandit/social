const express=require('express');

const cookieParser=require('cookie-parser');

const app=express();

const port=8000;

const expresslayouts=require('express-ejs-layouts');

const connectDb=require('./config/mongoose');

connectDb();

const session=require('express-session');

const passport=require('passport');

const passportLocal=require('./config/passport-local-strategy');


app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets') );

app.use(expresslayouts);

app.set('layout extractStyles',true);


app.set('layout extractScripts',true);




app.set('view engine','ejs');

app.set('views','./views');

app.use(session({

    name:'test',

    secret:"blahsomething...",

    saveUninitialized:false,

    resave:false,

    cookie:{
//in miliseconds
        maxAge:(1000 * 60 * 100)
    }



}));

app.use(passport.initialize());

app.use(passport.session());

app.unsubscribe(passport.setAuthenticatedUser)

app.use('/',require('./routes/home'));




app.listen(port,function(err){

    if(err){

        console.log(`There was an error while running the server ${err}`);

        return;
    }

    console.log(`The server is up and running on port : ${port}`);

});

