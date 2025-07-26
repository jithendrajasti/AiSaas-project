const express=require('express');
const cors=require('cors');
const dbConnect = require('./config/database');
const cloudinaryConnect = require('./config/cloudinaryConnect');
const {clerkMiddleware, requireAuth}=require('@clerk/express');
const router = require('./routes/aiRoutes');
const userRouter = require('./routes/userRoutes');
require('dotenv').config();


const app=express();

(async()=>{
   try {
    await dbConnect();
    cloudinaryConnect();
   } catch (error) {
    console.log(error.message)
   }
})();

app.use(cors({
    origin:['https://ai-saas-project-ten.vercel.app','http://localhost:5173'],
    credentials:true
}));

app.use(express.json());



app.get('/',(req,res)=>{
    res.send('server is working !')
});

app.use(clerkMiddleware());
app.use(requireAuth());


app.use('/ai',router);
app.use('/user',userRouter);

const port=process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});