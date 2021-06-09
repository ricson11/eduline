const express = require('express');
const nodemailer = require('nodemailer');
const env = require('dotenv');
const Contact = require('../models/Contact');
const router = express.Router();
env.config({path: '../.env'});

require('../models/Contact');
require('../models/User');







router.get('/contacts', async(req, res)=>{
    let contacts = await Contact.find({}).sort({date:-1})
    res.render('contacts/index', {contacts});
});


router.post('/contact', async(req, res)=>{
    try{
    const newContact={
        messageBody: req.body.messageBody,
        name: req.body.name,
         email: req.body.email,
      
     }
     contact = await Contact.create(newContact)
     console.log(contact)
    
     let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        tls:{
            rejectUnauthorized: false,
        },
        auth:{
         user: process.env.GMAIL_EMAIL,
         pass:process.env.GMAIL_PASS
        },
    });

     var mailOptions={
                   from: req.body.email,
                   to: process.env.GMAIL_EMAIL,
                   replyTo: req.body.email,
                   subject: 'Message from' +' '+ req.body.name,
                   text: req.body.messageBody,
          };
       
         transporter.sendMail(mailOptions, function(err, info){
           if(err){
               console.log(err)
               req.flash('error_msg', 'Message not sent, try again')
               return res.redirect('back')
           }else{
               console.log('Message sent successfully' + info.response)
               req.flash('success_msg', 'Message delivered successfully')
               return res.redirect('back')
           }
       })
    }
    catch(err){
        console.log(err.message)
        res.redirect('/500');
    }
});



router.get('/contact/:slug', async(req, res)=>{
    try{
    contact = await Contact.findOne({slug: req.params.slug});
    contact.isRead=true;
    contact.save();
    res.render('contacts/show', {contact});
    }
    catch(err){
        console.log(err.message)
        res.redirect('/500');
    }
});


router.get('/delete/contact/:slug', async(req, res)=>{
  try{
      let contact = await Contact.deleteOne({slug: req.params.slug})
      
      console.log(contact)
       req.flash('success_msg', 'Message deleted')
       res.redirect('back');
  }
  catch(err){
      console.log(err.message)
      res.redirect('/500');
  }
});




module.exports = router;