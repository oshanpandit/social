const Post=require('../models/post');


//populate the user of each post
module.exports.home=function(req,res){

   Post.find({})
   
   .populate('user')
   .populate({
    path:'comments',
    populate:{

        path:'user'
    }
   })
   .exec(function(err,post){

    return res.render('home',{

        posts: post
        
    })

    
   });
    

}

