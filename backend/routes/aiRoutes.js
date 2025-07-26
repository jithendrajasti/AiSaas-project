const express=require('express');
const auth = require('../middlewares/auth');
const { generateArticle, generateBlogTitle, generateImage, removeBackground, removeObject, reviewResume } = require('../controllers/aiController');
const upload = require('../config/multer');

const router=express.Router();

router.post('/generate-article',auth,generateArticle);
router.post('/generate-title',auth,generateBlogTitle);
router.post('/generate-image',auth,generateImage);
router.post('/remove-background', auth, upload.single('image'), removeBackground);
router.post('/remove-object', auth, upload.single('image'), removeObject);
router.post('/review-resume', auth, upload.single('resume'), reviewResume);


module.exports=router;