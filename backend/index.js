const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/genuineCharityDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, ()=>{
    console.log("DB connected");
});

const donorSchema = new mongoose.Schema({
    name:String,
    username: String,
    email:String,
    mobile:Number,
    password:String,
})

const beneficiarySchema = new mongoose.Schema({
    name:String,
    username: String,
    email:String,
    mobile:Number,
    password:String,
})

const Donor = new mongoose.model("Donor", donorSchema);
const Beneficiary = new mongoose.model("Beneficiary", beneficiarySchema);

//Routes
app.post('/benlog', (req, res)=>{
    const {username, password} = req.body;
    Beneficiary.findOne({username:username}, (err, beneficiary)=>{
        if(beneficiary){
            if(password === beneficiary.password){
                res.send({message:"Login successful",beneficiary:beneficiary})
            }
            else{
                res.send({message:"Password didn't match"})
            }
        }
        else{
            res.send({message:"Beneficiary not registered"})
        }
    })
})
app.post('/bensignup', (req, res)=>{
    const {name, username, email, mobile, password} = req.body;
    Beneficiary.findOne({username:username}, (err, user)=>{
        if(user){
            res.send({message:"Beneficiary already registered"})
        }
        else{
            const beneficiary = new Beneficiary({
                name,
                username,
                email,
                mobile,
                password
            })
            beneficiary.save(err=>{
                if(err){
                    res.send(err);
                }
                else{
                    res.send({message:"successfully registered"})
                }
            })  
        }
    })
})
app.post('/Donarlog', (req, res)=>{
    const {username, password} = req.body;
    Donor.findOne({username:username}, (err, donor)=>{
        if(donor){
            if(password === donor.password){
                res.send({message:"Login successful", donor:donor})
            }
            else{
                res.send({message:"Password didn't match"})
            }
        }
        else{
            res.send({message:"Donor not registered"})
        }
    })
})

app.post('/Donorsignup', (req, res)=>{
    const {name, username, email, mobile, password} = req.body;
    Donor.findOne({username:username}, (err, user)=>{
        if(user){
            res.send({message:"Donor already registered"})
        }
        else{
            const donor = new Donor({
                name,
                username,
                email,
                mobile,
                password
            })
            donor.save(err=>{
                if(err){
                    res.send(err);
                }
                else{
                    res.send({message:"successfully registered"})
                }
            })  
        }
    })
   
})


app.listen(9002, ()=>{
    console.log("BE started at port 9002");
})