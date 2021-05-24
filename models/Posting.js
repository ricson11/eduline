const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const PostingSchema = new Schema({

    title:{
        type: String,

    },
    isRead:{
        type: Boolean,
        default: false
    },
    postingId:{
        type: String,
    },
    slug:{
        type: String,
        unique: true,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    }
});

PostingSchema.pre('validate', function(){
    if(this.title){
        this.slug = slugify(this.title, {lower: true, strict: true})
    }
});

module.exports = Posting = mongoose.model('postings', PostingSchema);