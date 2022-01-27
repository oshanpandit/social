const User = require('../models/user');

module.exports.profile=function(req,res){

    User.findById(req.params.id,function(err,user){
     
        res.render('user_profile.ejs',{
            profile_user:user
        });

    });

}

module.exports.signIn=function(req,res){

    if(req.isAuthenticated()){

        return res.redirect('/user/profile');
    }

return res.render('user_signIn.ejs');
};

module.exports.signUp=function(req,res){

    if(req.isAuthenticated()){

        return res.redirect('/user/profile');

    }


   return res.render('user_signUp.ejs');
};

module.exports.create=function(req,res){

    if(req.body.password!=req.body.cnfrm_password){

        return res.redirect('back');
    }


    User.findOne({email:req.body.email},function(err,user){

        if(err){console.log('error signing up'); 
        
        return
    
    };
 
         if(!user){

            User.create(req.body,function(err,user){

                if(err){console.log('error in creating user while signing up'); return}

                 return res.redirect('/user/signIn');
            });
         }else{

            return res.redirect('back');
         };

    }); 

};

module.exports.createSession=function(req,res){

    return res.redirect('/');

};

module.exports.destroySession=function(req,res){

    req.logout();

    return res.redirect('/');
}