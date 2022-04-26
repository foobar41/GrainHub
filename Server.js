const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));
app.set("view engine", "ejs");
app.use(express.static(__dirname));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/grainhub');
const db = mongoose.connection;

db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(){
   console.log("connection succeeded");
})

const users = db.collection('users');
const farmer = db.collection('farmer');

// current user credentials
// remove let if error
var cur_email, cur_pass, cur_user;

app.listen(3000, () => {
   console.log("Server started at port 3000");
});

app.get('/',function(req,res){
   res.render('Signup');
});

app.get('/dir_login', function(req,res){
   res.render('Login')
})

app.get('/dir_signup', function(req,res){
   res.render('Signup')
})

app.get('/home', function(req,res){
   res.render('Home',{user: cur_user})
})

app.get('/about', function(req,res){
   res.render('About')
})

app.get('/contact', function(req,res){
   res.render('Contact')
})

app.get('/status', function(req,res){
   res.render('Status');
})

app.post('/signup', function(req,res){
   const fname = req.body.fname;
   const lname = req.body.lname;
   const email = req.body.email;
   const num = req.body.num;
   const add = req.body.add;
   const pass = req.body.password;
   const conf_pass = req.body.conf_password;
   const user = req.body.user;

   const data = {
      "fname": fname,
      "lname": lname,
      "email": email,
      "num": num,
      "add": add,
      "password": pass,
      "mode": user
   }

   if(!fname || !lname || !email || !num || !add || !pass || !conf_pass || !user || !(pass === conf_pass)) {
      res.render('Signup')
      return;
   }

   users.insertOne(data,function(err, collection){
      if (err) throw err;
      console.log("Record inserted Successfully");
   });

   cur_email = email;
   cur_pass = pass;
   cur_user = user;
   res.render("Home",{ user: cur_user });
})


app.post('/login', function(req,res){
   const email = req.body.email;
   const pass = req.body.password;
   const user = req.body.user;

   if(!email || !pass || !user) {
      res.render('Login')
      return;
   }
   // admin portal
   if (email==="admin@123" && pass==="admin123" && user==="Farmer"){
      res.render('Admin');
      return;
   }

   const data = {
      "email":email,
      "password":pass,
      "mode":user
   }

   users.findOne(data, function(err, exist){
      if (exist){
         console.log('login successful')
         cur_email = email;
         cur_pass = pass;
         cur_user = user;
         res.render('Home',{user: cur_user})
      }
      else{
         console.log('incorrect credentials')
         res.render('Login')
      }
   })
})


app.get('/dir_profile', function(req,res){
   users.findOne({"email":cur_email},function(err,details){
      if(err) throw err;
      res.render("Profile",{data: details});
   })
})

app.post('/profile', function(req,res){
   const fname = req.body.fname;
   const lname = req.body.lname;
   const num = req.body.num;
   const add = req.body.add;

   const original = {
      "email": cur_email
   }

   const data = {
      $set: {
         "fname": fname,
         "lname": lname,
         "num": num,
         "add": add
      }
   }

   users.updateOne(original, data, function(err, exist){
      if(err) throw err;
		console.log("Record updated successfully");
   })

   res.render('Home',{user: cur_user})
})


app.get('/display', function(req,res){
   farmer.find({}).toArray(function(err,result){
      if(err) throw err;
      res.render("Display",{data: result});
   })
})


app.post('/displaySearch',function(req,res){
   const query = req.body.query;

   farmer.find({"product": query}).toArray(function(err,result){
      if (err) throw err;
      res.render('Display',{data: result})
      // records += result;
      
   })

   // farmer.find({"fname": query}).toArray(function(err,result){
   //    if (err) throw err;
   //    records += result;
   // })

   // farmer.find({"qty": query}).toArray(function(err,result){
   //    if (err) throw err;
   //    records += result;
   // })
})


app.get('/logout',function(req,res){
   res.render('Login');
   cur_email = cur_pass = cur_user = null;
})