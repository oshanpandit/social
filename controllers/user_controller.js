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

                req.flash('success','User Created!')
                 return res.redirect('/user/signIn');
            });
         }else{

            return res.redirect('back');
         };

    }); 

};

module.exports.createSession=function(req,res){

    req.flash('success','Logged in Successfully');
    return res.redirect('/');

};

module.exports.destroySession=function(req,res){

    req.logout();

    req.flash('success','You have logged out!');

    return res.redirect('/');
}

module.exports.update=function(req,res){

    if(req.user.id==req.params.id){

        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){

           
            req.flash('success','User Information updated!');
          res.redirect('back');
    
        });
       
    }else{

        return res.status(401).send('Unauthorized');
    }

   
}