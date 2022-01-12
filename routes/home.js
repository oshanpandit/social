const express=require('express');

const router=express.Router();

const homepageController=require('../controllers/home_controller');

router.get('/',homepageController.home);

router.use('/user',require('./user.js'));

module.exports=router;
