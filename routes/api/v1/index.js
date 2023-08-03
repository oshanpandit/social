const express=require('express');

const router=express.Router();

router.use('/posts',require('./posts'));

router.use('/users',require('./users'));
// hello world

module.exports=router;