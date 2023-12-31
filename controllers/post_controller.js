const Post=require('../models/post');

const Comment=require('../models/comment');

module.exports.create=async function(req,res){

 try {

    let post=await Post.create({

        content:req.body.content,
        user:req.user._id


    });

    req.flash('success','Post Published!'); 

    return res.redirect('back');
     
 } catch (err) {

   req.flash('error',err);
     
    console.log('error',err);

    return;
 }
    

}

module.exports.destroy=async function(req,res){

   try {

    let post=await Post.findById(req.params.id);

    //.id means coverting object id into string
    if(post.user==req.user.id){

        post.remove();

      

       await Comment.deleteMany({post:req.params.id});

       req.flash('success','Post and associated coments deleted');

       return res.redirect('back');

    }

    else{

      req.flash('error','You can not delete the post');

        return res.redirect('back');
    }
       
   } catch (err) {

      req.flash('error',err);
       
    console.log('error',err);

    return;
   }

}