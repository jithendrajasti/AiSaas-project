const Creation = require("../models/creations");


const userCreations=async(req,res)=>{
    try {
        
        const {userId}=req.auth();

        const creationsData=await Creation.find({user_id:userId});

        res.json({success:true,creations:creationsData});

    } catch (error) {
        res.json({success:false,message:error.message});
    }
}

const publishedCreations=async(req,res)=>{
    try {
        const creationsData=await Creation.find({publish:true});
        res.json({success:true,creations:creationsData});
    } catch (error) {
        res.json({success:false,message:error.message});
    }
}

//function to like or dislike a creation

const likeCreation=async(req,res)=>{
    try {
        const {userId}=req.auth();
        const {id}=req.body;
        const creation=await Creation.findById(id);
        if(!creation){
            return res.json({success:false,message:"creation not found"});
        }
        const currentLikes=creation.likes;
        const userIdStr=userId.toString();
        let updatedLikes;
        let message;


        if(currentLikes.includes(userIdStr)){
            updatedLikes=currentLikes.filter((user)=>user!==userIdStr);
            message='creation unliked';
        }else{
            updatedLikes=[...currentLikes,userIdStr];
            message="creation liked";
        }

        const formattedArray=`{${updatedLikes.join(',')}}`;

        creation.likes=updatedLikes;
        await creation.save();

        res.json({success:true,message});

    } catch (error) {
         res.json({success:false,message:error.message});
    }
}

module.exports={userCreations,publishedCreations,likeCreation};