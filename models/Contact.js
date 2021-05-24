const express = require('express');
const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;
const ContactSchema = new Schema({
        messageBody:{
            type: String,
            required: true,
        },

      name:{
          type: String,
          required: true
      },
      email:{
        type: String,
        required: true,
    },
     isRead:{
         type: Boolean,
         default: false
     },
    date:{
        type: Date,
        default: Date.now,
    },
    slug:{
        type: String,
        unique: true,
        required: true,
    }
      
    });

  ContactSchema.pre('validate', function(){
      if(this.name){
          this.slug = slugify(this.name, {lower: true, strict: true})
      }
  });

    module.exports = Contact = mongoose.model('contacts', ContactSchema)