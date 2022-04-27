const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer")

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/grainhub');
const db = mongoose.connection;

db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(){
   console.log("connection succeeded");
})

// const transporter = nodemailer.createTransport({
//    service: 'gmail',
//    auth: {
//       user: 'akhil.55055@gmail.com',
//       pass: 'akhil@2022'
//   }
// })

const users = db.collection('users');
const farmer = db.collection('farmer');
const contact = db.collection('contact');

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

   if(!fname || !lname || !email || !num || !(num.length === 10) || !add || !pass || !conf_pass || !user || !(pass === conf_pass)) {
      res.render('Signup')
      return;
   }

   

   users.count(function(err,count){

      if (count === 0){
         users.insertOne(data,function(err, collection){
            if (err) throw err;
            console.log("Record inserted Successfully");
         });
   
         cur_email = email;
         cur_pass = pass;
         cur_user = user;
         res.render("Home",{ user: cur_user });
      } 
      else {
         users.findOne({"email": email}, function(err, result){
            if (err) throw err;
            if (result != null){
               console.log("User already exists");
               return res.render("Login");
            }
            else {
               users.insertOne(data,function(err, collection){
                  if (err) throw err;
                  console.log("Record inserted Successfully");
               });
         
               cur_email = email;
               cur_pass = pass;
               cur_user = user;
               res.render("Home",{ user: cur_user });
            }
         })
      }
   })   
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
      res.redirect('/adminf')
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

   if(!fname || !lname || !num || !add) {
      users.findOne({"email":cur_email},function(err,details){
         if(err) throw err;
         res.render("Profile",{data: details});
      })
   }

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

   users.findOne({"email":cur_email},function(err,details){
      if(err) throw err;
      res.render("Profile",{data: details});
   })
})


app.get('/display', function(req,res){
   farmer.find({}).toArray(function(err,result){
      if(err) throw err;
      res.render("Display",{data: result});
   })
})


app.post('/displaySearch',function(req,res){
   const query = req.body.query;

   if (query === "jowar") {
      farmer.find({"jowar": {$ne : 0}}).toArray(function(err,result){
         if (err) throw err;
         res.render('Display',{data: result})
         
      })
   }

   if (query === "rice") {
      farmer.find({"rice": {$ne : 0}}).toArray(function(err,result){
         if (err) throw err;
         res.render('Display',{data: result})
         
      })
   }

   if (query === "corn") {
      farmer.find({"corn": {$ne : 0}}).toArray(function(err,result){
         if (err) throw err;
         res.render('Display',{data: result})
         
      })
   }

   if (query === "wheat") {
      farmer.find({"wheat": {$ne : 0}}).toArray(function(err,result){
         if (err) throw err;
         res.render('Display',{data: result})
         
      })
   }
})

app.get('/status',function(req,res){
   farmer.findOne({"email":cur_email},function(err,result){
      if (err) throw err;
      if (result) res.render('Status',{data: result});
      else res.render('Status',{data: null})
   })
})

app.post('/updateJowar',function(req,res){
   const jowar = req.body.jowar;
   farmer.findOne({"email":cur_email},function(err,result){
      if (result) {
         const query = {"email":cur_email};
         const update = {$set: {"jowar":jowar}};
         farmer.findOneAndUpdate(query, update, function(err,res){
            if (err) throw err;
            console.log("updated a record");
         })
         res.redirect('/status');
      }
      else {
         users.findOne({"email":cur_email},function(err,result){
            const data = {
               "fname": result.fname,
               "lname": result.lname,
               "email": cur_email,
               "num": result.num,
               "add": result.add,
               "jowar": jowar,
               "rice": 0,
               "corn": 0,
               "wheat": 0
            }
            farmer.insertOne(data,function(err, collection){
               if (err) throw err;
               console.log("Record inserted Successfully");
            });
         })
      }
   })
})

app.post('/updateRice',function(req,res){
   const rice = req.body.rice;
   farmer.findOne({"email":cur_email},function(err,result){
      if (result) {
         const query = {"email":cur_email};
         const update = {$set: {"rice":rice}};
         farmer.findOneAndUpdate(query, update, function(err,res){
            if (err) throw err;
            console.log("updated a record");
         })
         res.redirect('/status');
      }
      else {
         users.findOne({"email":cur_email},function(err,result){
            const data = {
               "fname": result.fname,
               "lname": result.lname,
               "email": cur_email,
               "num": result.num,
               "add": result.add,
               "jowar": 0,
               "rice": rice,
               "corn": 0,
               "wheat": 0
            }
            farmer.insertOne(data,function(err, collection){
               if (err) throw err;
               console.log("Record inserted Successfully");
            });
         })
      }
   })
})

app.post('/updateCorn',function(req,res){
   const corn = req.body.corn;
   farmer.findOne({"email":cur_email},function(err,result){
      if (result) {
         const query = {"email":cur_email};
         const update = {$set: {"corn":corn}};
         farmer.findOneAndUpdate(query, update, function(err,res){
            if (err) throw err;
            console.log("updated a record");
         })
         res.redirect('/status');
      }
      else {
         users.findOne({"email":cur_email},function(err,result){
            const data = {
               "fname": result.fname,
               "lname": result.lname,
               "email": cur_email,
               "num": result.num,
               "add": result.add,
               "jowar": 0,
               "rice": 0,
               "corn": corn,
               "wheat": 0
            }
            farmer.insertOne(data,function(err, collection){
               if (err) throw err;
               console.log("Record inserted Successfully");
            });
         })
      }
   })
})

app.post('/updateWheat',function(req,res){
   const wheat = req.body.wheat;
   farmer.findOne({"email":cur_email},function(err,result){
      if (result) {
         const query = {"email":cur_email};
         const update = {$set: {"wheat":wheat}};
         farmer.findOneAndUpdate(query, update, function(err,res){
            if (err) throw err;
            console.log("updated a record");
         })
         res.redirect('/status');
      }
      else {
         users.findOne({"email":cur_email},function(err,result){
            const data = {
               "fname": result.fname,
               "lname": result.lname,
               "email": cur_email,
               "num": result.num,
               "add": result.add,
               "jowar": 0,
               "rice": 0,
               "corn": 0,
               "wheat": wheat
            }
            farmer.insertOne(data,function(err, collection){
               if (err) throw err;
               console.log("Record inserted Successfully");
            });
         })
      }
   })
})


app.get('/adminf',function(req,res){
   users.find({"mode": "Farmer"}).toArray(function(err,result){
      if (err) throw err;
      res.render('Adminf',{data: result});
   });
})


app.post('/delf',function(req,res){
   const del = req.body.delete;
   console.log(del);
   const myquery = { "email": del };
   users.deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      res.redirect('/adminf');
  });
})

app.get('/adminc',function(req,res){
   users.find({"mode": "Consumer"}).toArray(function(err,result){
      if (err) throw err;
      res.render('Adminc',{data: result});
   });
})


app.post('/delc',function(req,res){
   const del = req.body.delete;
   console.log(del);
   const myquery = { "email": del };
   users.deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      res.redirect('/adminc');
  });
})


app.post('/contactSubmit',function(req,res){
   const fname = req.body.fname;
   const lname = req.body.lname;
   const email = req.body.email;
   const num = req.body.num;
   const msg = req.body.msg;

   const data = {
      "fname": fname,
      "lname": lname,
      "email": email,
      "num": num,
      "message": msg,
   }

   if(!fname || !lname || !email || !num || !(num.length === 10) || !msg) {
      res.render('Signup')
      return;
   }

   contact.insertOne(data,function(err, collection){
      if (err) throw err;
      console.log("Message recorded successfully");
   });
   
   // const mailOptions = {
   //    from: 'akhil.55055@gmail.com',
   //    to: 'akhil.gs20@iiits.in',
   //    subject: 'Requested help from GrainHub',
   //    text: `${fname} needs attention about\n\t${msg}\n\nContact this person at ${email}`
   // };
   
   // transporter.sendMail(mailOptions, function(error, info){
   //    if (error) {
   //    console.log(error);
   //    } else {
   //    console.log('Email sent: ' + info.response);
   //    }
   // });
})

app.get('/logout',function(req,res){
   res.render('Login');
   cur_email = cur_pass = cur_user = null;
})