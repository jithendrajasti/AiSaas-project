const mongoose=require('mongoose');
require('dotenv').config();

const dbConnect=async()=>{
    mongoose.connection.on('connected',()=>{
        console.log('DataBase connected');
    })
    await mongoose.connect(process.env.MONGODB_URL+'/ai-saas',{
        serverSelectionTimeoutMS:20000
    });
}

module.exports=dbConnect;
