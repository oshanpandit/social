const express=require('express');

const cookieParser=require('cookie-parser');

const app=express();

const port=8000;

const expresslayouts=require('express-ejs-layouts');

const db=require('./config/mongoose');

const session=require('express-session');

const passport=require('passport');

const passportLocal=require('./config/passport-local-strategy');

const passportJWT=require('./config/passport-jwt-strategy');

const passportGoogle=require('./config/passport-google-oauth2-strategy');

const MongoStore=require('connect-mongo');

const flash=require('connect-flash');

const customMware=require('./config/middleware');

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets') );

app.use('/uploads',express.static(__dirname + '/uploads'));

app.use(expresslayouts);

app.set('layout extractStyles',true);

app.set('layout extractScripts',true);

app.set('view engine','ejs');

app.set('views','./views');

//mongo store is used to store the session in the db
app.use(session({

    name:'user',

    //change the secreat before deployment
    secret:"blahsomething...",

    saveUninitialized:false,

    resave:false,

    cookie:{
//in miliseconds
        maxAge:(1000 * 60 * 100)
    },

    store:MongoStore.create({

        mongoUrl:'mongodb://localhost/user_list_db',
        autoRemove:'disabled'

    },

    function(err){

        if(err){

            console.log(err || 'connect-mongodb setup ok');
        }

    }
    
    
    )

}));

app.use(passport.initialize());

app.use(passport.session());

app.use(passport.setAuthenticatedUser); 

app.use(flash());

app.use(customMware.setFlash);

app.use('/',require('./routes/home'));


app.listen(port,function(err){

    if(err){

        console.log(`There was an error while running the server ${err}`);

        return;
    }

    console.log(`The server is up and running on port : ${port}`);

});

