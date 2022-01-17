const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/user_list_db')

const db=mongoose.connection;

db.on('error',console.error.bind(console,"error connectiong to MongoDB"));

db.once('open',function(){

    console.log('connected to database :: MongoDB');

});

module.exports=db;