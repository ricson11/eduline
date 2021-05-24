const express = require('express');
const router = express.Router();

require('../models/Message');
require('../models/User');
require('../models/Scholar');



router.get('/new/message',(req, res)=>{
  
    res.render('messages/new');
});




router.get('/messages', async(req, res)=>{
    res.render('messages/index');
});

router.get('/message/:slug', async(req, res)=>{
    try{
    message = await Message.findOne({slug: req.params.slug});
    res.render('messages/show', {message});
    }
    catch(err){
        console.log(err.message)
        res.redirect('/500');
    }
});

router.post('/message', async(req, res)=>{
    try{
    const newMessage={
        mesBody: req.body.mesBody,
        title: req.body.title,
      
     }
     message = await Message.create(newMessage)
     console.log(message)
     req.flash('success_msg', 'SCholarship message delivered to users')
     res.redirect('back');
    }
    catch(err){
        console.log(err.message)
        res.redirect('/500');
    }
});



module.exports = router;