const express = require('express');
const mongoose = require('mongoose');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const path = require('path');
const env = require('dotenv');
const {stripTags, adminDate, formatTime, formatDate, formatNew, select, truncate} = require('./helpers/hps');
require('./config/passport')(passport);

env.config({path: './.env'});

const app = express();



 

mongoose.promise = global.promise;


//development
/*
mongoose.connect(process.env.localConnection, {
     useNewUrlParser:true, useUnifiedTopology:true,useCreateIndex: true, useFindAndModify: true,
})
.then(()=>console.log('mongodb is connected'))
.catch(err=>console.log(err)); */


//production
mongoose.connect(process.env.mongoConnection, {
     useNewUrlParser:true, useUnifiedTopology:true,useCreateIndex: true, useFindAndModify: true,
})
.then(()=>console.log('mongodb is connected'))
.catch(err=>console.log(err)); 


app.engine('handlebars', exphbs({
    helpers:{
         stripTags: stripTags,
         select: select,
         formatTime: formatTime,
         formatDate: formatDate,
         formatNew: formatNew,
         truncate: truncate,
         adminDate: adminDate,
    },
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(methodOverride('_method'));


app.use(session({
    secret: 'secret',
    resave:false,
    saveUninitialized:false,
    store: MongoStore.create({mongoUrl: process.env.mongoConnection})
     
}));




app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(async function(req, res, next){
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null;
    try{
       let notify = await Notification.find({isRead:'false'}).sort({date:-1})
       res.locals.notifications = notify;
       
      
       
    }catch(err){
        console.log(err.message)
    }
    next();
});


//routes

app.use('/', require('./routes/post'));
app.use('/', require('./routes/user'));
app.use('/', require('./routes/contact'));
app.use('/admin', require('./routes/admin'));
app.use('/post/:slug', require('./routes/comment'));
app.use('/scholarship', require('./routes/scholar'));


app.use('/fonts', express.static(__dirname + '/node_modules/font-awesome/fonts'));
app.use('/ckeditor', express.static(__dirname + '/node_modules/ckeditor'));
app.use('/dist', express.static(__dirname + '/node_modules/popper.js/dist'));


app.use(express.static(path.join(__dirname, 'public')));

//500 server error page
app.get('/500', (req, res)=>{
    res.render('errors/500')
});

//show 404 page if page is not found
app.use(function(req, res){
    res.status(404).render('errors/404')
});

app.set('port', process.env.PORT || 80);
app.listen(app.get('port'),()=>console.log('server is running on port' + " "+ app.get('port')));
