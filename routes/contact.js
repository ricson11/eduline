const express = require('express');
const nodemailer = require('nodemailer');
const env = require('dotenv');
const Contact = require('../models/Contact');
const router = express.Router();
env.config({path: '../.env'});

require('../models/Contact');
require('../models/User');






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




router.get('/contacts', async(req, res)=>{
    let contacts = await Contact.find({}).sort({date:-1})
    res.render('contacts/index', {contacts});
});




module.exports = router;