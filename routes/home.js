const express=require('express');

const router=express.Router();

const homepageController=require('../controllers/home_controller');

router.get('/',homepageController.home);

router.use('/user',require('./user.js'));

router.use('/post',require('./post'));

router.use('/comment',require('./comment'));

module.exports=router;
