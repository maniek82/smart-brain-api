const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt-nodejs");
const knex = require('knex');

//CONTROLLERS
const register =  require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
      ssl: true
    }
  });



const app = express();
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());



app.get('/',(req,res)=> {
    res.send("App is working");
})

app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)});

app.post('/register',(req,res)=>{register.handleRegister(req, res,db,bcrypt)})

app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)})




app.put('/image',(req,res)=>{image.imageHandler(req,res,db)})

app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})



app.listen(process.env.PORT || 3000,()=> {
    console.log(`Server running on port ${process.env.PORT}`)
})

