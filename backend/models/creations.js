const mongoose=require('mongoose');

const creationSchema=new mongoose.Schema({
       user_id:{type:String,required:true},
       prompt:{type:String,required:true},
       content:{type:String,required:true},
       type:{type:String,required:true},
       publish:{type:Boolean,default:false},
       likes:{type:[String],default:[]},
       created_at:{type:Number,default:Date.now()},
       updated_at:{type:Number,default:Date.now()}
});

const Creation=mongoose.model('creation',creationSchema);

module.exports=Creation;