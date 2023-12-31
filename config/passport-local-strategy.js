const passport=require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User=require('../models/user');

passport.use(new LocalStrategy({

    usernameField:'email',
    passReqToCallback:true
}, 

function(req,email,password,done){

User.findOne({email:email},function(err,user){

    if(err){
 
        req.flash('error',err);
        console.log("error in finding user --> passport");


        return done(err);
    }

    if(!user || user.password!=password){

        req.flash('error','Invalid Username/Password');

        console.log('Invalid username /Password');

        return done(null,false);
    }

    return done(null,user);

});

}

));

//serializing the user to decide which key to be kept in the cookie

passport.serializeUser(function(user,done){

    done(null,user.id);
});

// deserializing the user from the key in the cookies

passport.deserializeUser(function(id,done){

    User.findById(id,function(err,user){

        if(err){

            console.log('error in finding the user');

            return done(err);
        }

        return done(null,user);
    });
});

//check if the user is authenticated

passport.checkAuthentication=function(req,res,next){

    //if the user is signed in

    if(req.isAuthenticated()){

        return next();
    }

    //if the user is not signed in

    return res.redirect('/user/signIn');

}

passport.setAuthenticatedUser=function(req,res,next){

    if(req.isAuthenticated()){

        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for views
        res.locals.user=req.user;
    }

    next();
}
module.exports=passport;