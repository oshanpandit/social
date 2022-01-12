const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/user_list_db')

function connectDb(){
    const connection=mongoose.connection;
    connection.once('open',(err)=>{
        if(err){
            console.log("Not connected to database!");
            return;
        }
        console.log('Server is connected to the database!');
    })
}
module.exports=connectDb;