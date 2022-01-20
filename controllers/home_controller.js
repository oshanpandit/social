const Post=require('../models/post');


//populate the user of each post
module.exports.home=function(req,res){

   Post.find({}).populate('user','name email _id').exec(function(err,post){

    return res.render('home',{

        posts: post
        
    })

    
   });
    

}

