const express = require('express');
const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;
const MessageSchema = new Schema({
        mesBody:{
            type: String,
            required: true,
        },

      title:{
          type: String,
          required: true
      },
     
    date:{
        type: Date,
        default: Date.now,
    },
    slug:{
        type: String,
        unique: true,
        required: true,
    },
  
      
    });

  MessageSchema.pre('validate', function(){
      if(this.title){
          this.slug = slugify(this.title, {lower: true, strict: true})
      }
  });

    module.exports = Message = mongoose.model('messages', MessageSchema)