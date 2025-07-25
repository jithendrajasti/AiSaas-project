const express=require('express');
const auth = require('../middlewares/auth');
const { userCreations, publishedCreations, likeCreation } = require('../controllers/userController');

const userRouter=express.Router();

userRouter.get('/get-creations',auth,userCreations);
userRouter.get('/get-published-creations',publishedCreations);
userRouter.post('/like-creation',auth,likeCreation);

module.exports=userRouter;