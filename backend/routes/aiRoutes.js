const express=require('express');
const auth = require('../middlewares/auth');
const { generateArticle, generateBlogTitle, generateImage, removeBackground, removeObject, reviewResume } = require('../controllers/aiController');
const upload = require('../config/multer');

const router=express.Router();

router.post('/generate-article',auth,generateArticle);
router.post('/generate-title',auth,generateBlogTitle);
router.post('/generate-image',auth,generateImage);
router.post('/remove-background',upload.single('image'),auth,removeBackground);
router.post('/remove-object',upload.single('image'),auth,removeObject);
router.post('/review-resume',upload.single('resume'),auth,reviewResume);

module.exports=router;