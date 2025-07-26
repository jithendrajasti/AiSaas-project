const OpenAI = require('openai');
const {clerkClient}=require('@clerk/express');
const Creation = require('../models/creations');
const { default: axios } = require('axios');
const cloudinary=require('cloudinary');
const pdf=require('pdf-parse/lib/pdf-parse.js');
const fs=require('fs');
require('dotenv').config();

const ai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
})

const generateArticle = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt, length } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;
        if (plan !== 'premium' && free_usage >= 10) {
            //this means that user is not having premium subscription & already freelu used more than 10 times

            return res.json({ success: false, message: "Limit reached,Upgrade to premium" });
        }

        //in all other cases user can generate article (Gemini Api)

        const response = await ai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content:prompt,
                },
            ],
            temperature:0.7,
            max_tokens:length
        });


        const content=response.choices[0].message.content;

        //store the article generated in database

        await Creation.create({
            user_id:userId,
            prompt:prompt,
            content:content,
            type:'article'
        }); 

        if(plan!=='premium'){
            await clerkClient.users.updateUserMetadata(userId,{
                privateMetadata:{
                    free_usage:free_usage+1
                }
            });
        }

        res.json({success:true,content});

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

const generateBlogTitle = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt} = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;
        if (plan !== 'premium' && free_usage >= 10) {
            //this means that user is not having premium subscription & already freelu used more than 10 times

            return res.json({ success: false, message: "Limit reached,Upgrade to premium" });
        }

        //in all other cases user can generate Title (Gemini Api)

        const response = await ai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content:prompt,
                },
            ],
            temperature:0.7,
            max_tokens:250
        });


        const content=response.choices[0].message.content;

        //store the title generated in database

        await Creation.create({
            user_id:userId,
            prompt:prompt,
            content:content,
            type:'blog-title'
        }); 

        if(plan!=='premium'){
            await clerkClient.users.updateUserMetadata(userId,{
                privateMetadata:{
                    free_usage:free_usage+1
                }
            });
        }

        res.json({success:true,content});

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
const generateImage = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt, publish } = req.body;
        const plan = req.plan;
        if (plan !== 'premium') {
            //this means that user is not having premium subscription & already freelu used more than 10 times

            return res.json({ success: false, message: "This feature is only avaialble for premium subscriptions" });
        }

        //to generate image,we have to use clipDrop api

       const form=new FormData();
       form.append('prompt',prompt);

      const {data}=await axios.post('https://clipdrop-api.co/text-to-image/v1',form,{
        headers:{
            'x-api-key':process.env.CLIPDROP_API_KEY
        },
         responseType:"arraybuffer"
       })

       const base64Image=`data:image/png;base64,${Buffer.from(data,'binary').toString('base64')}`;

       //uploading image to cloud

       const {secure_url}=await cloudinary.uploader.upload(base64Image);

       const imageUrl=secure_url;

        //store the image generated in database

        await Creation.create({
            user_id:userId,
            prompt:prompt,
            content:imageUrl,
            type:'image',
            publish:publish
        }); 


        res.json({success:true,content:imageUrl});

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

const removeBackground = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { image } = req.file;
        const plan = req.plan;
        if (plan !== 'premium') {
            //this means that user is not having premium subscription & already freelu used more than 10 times

            return res.json({ success: false, message: "This feature is only avaialble for premium subscriptions" });
        }

        //to remove image background,we will do it using cloudinary

       const {secure_url}=await cloudinary.uploader.upload(image.path,{
        transformation:[
            {
                effect:'background_removal',
                background_removal:'remove_the_background'
            }
        ]
       });

       const imageUrl=secure_url;

        //store the image generated in database

        await Creation.create({
            user_id:userId,
            prompt:'Remove background from image',
            content:imageUrl,
            type:'image'
        }); 


        res.json({success:true,content:imageUrl});

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
const removeObject = async (req, res) => {
    try {
        const { userId } = req.auth();
        const {object}=req.body;
        const { image } = req.file;
        const plan = req.plan;
        if (plan !== 'premium') {
            //this means that user is not having premium subscription & already freelu used more than 10 times

            return res.json({ success: false, message: "This feature is only avaialble for premium subscriptions" });
        }

        //to remove object,we will do it using cloudinary

       const {public_id}=await cloudinary.uploader.upload(image.path);

       const imageUrl=cloudinary.url(public_id,{
        transformation:[{
            effect:`gen_remove:${object}`
        }],
        resource_type:'image'
       })

        //store the image generated in database

        await Creation.create({
            user_id:userId,
            prompt:`removed ${object} from the image`,
            content:imageUrl,
            type:'image'
        }); 


        res.json({success:true,content:imageUrl});

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

const reviewResume = async (req, res) => {
    try {
        const { userId } = req.auth();
        const resume = req.file;
        const plan = req.plan;
        if (plan !== 'premium') {
            //this means that user is not having premium subscription & already freelu used more than 10 times

            return res.json({ success: false, message: "This feature is only avaialble for premium subscriptions" });
        }

        if(resume.size>5*1024*1024){
            return res.json({success:false,message:"Make sure that resume size is less than 5MB"});
        }
         
        const dataBuffer=fs.readFileSync(resume.path);
        const pdfdata=await pdf(dataBuffer);

        const prompt=`Review the following resume and provide constructive feedback on its strengths,weaknesses an areas for improvement.Resume content:\n\n${pdfdata.text}`
        
        //pass this prompt to gemini api

        const response = await ai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content:prompt,
                },
            ],
            temperature:0.7,
            max_tokens:1000
        });


        const content=response.choices[0].message.content;



        //store the image generated in database

        await Creation.create({
            user_id:userId,
            prompt:'review the uploaded resume',
            content:content,
            type:'resume-review'
        }); 


        res.json({success:true,content});

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

module.exports={generateArticle,generateBlogTitle,generateImage,removeBackground,removeObject,reviewResume};