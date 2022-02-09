const User = require('../models/user');

const fs=require('fs');

const path=require('path');

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

        req.flash('error','Enter the identical password!')

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

module.exports.update=async function(req,res){

    // if(req.user.id==req.params.id){

    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){

           
    //         req.flash('success','User Information updated!');
    //       res.redirect('back');
    
    //     });
       
    // }else{

    //     return res.status(401).send('Unauthorized');
    // }

    if(req.user.id==req.params.id){

        try{

            let user=await User.findById(req.params.id);

            User.uploadedAvatar(req,res,function(err){

                if(err){

                    console.log("********** Multer Error",err);
                }

                user.name=req.body.name;
                user.email=req.body.email;

                if(req.file){

                    if(user.avatar){
                    
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));


                    }

                    //saving the path of the uploaded file into the avatar field in the user
                   user.avatar=User.avatarPath + '/' + req.file.filename;
                }

                user.save();

                return res.redirect('back');
            });

        }catch(err){

            req.flash('error',err);
            return res.redirect('back');
        }

    }else{

        req.flash('error','Unauthorized');
        return res.status(401).send('Unauthorized');

    }
   
}