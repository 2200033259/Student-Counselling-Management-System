const express = require('express');
const cors = require('cors');
const {MongoClient} = require('mongodb');
const bcrypt = require('bcrypt');

//config
const app = new express();
app.use(express.json());
app.use(cors());



const Client = new MongoClient('mongodb+srv://admin1:admin0@cluster0.c0neqjd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
Client.connect();
const db = Client.db('Skill');
const col = db.collection('user');

app.get('/home',(req,res)=>{
    res.send("Home page");
})

app.post('/insert', async(req,res)=>{
    console.log(req.body);
    req.body.password = await bcrypt.hash(req.body.password,5);
    console.log(req.body);
    col.insertOne(req.body);  //adding into database
    res.send("succesfully submitted");
})

app.post('/check', async (req, res) => {
    try {
        const result1 = await col.findOne({ 'name': req.body.un });
        console.log('Result from database:', result1);
    
        if (result1) {
            console.log('Input password:', req.body.pw);
            console.log('Stored hashed password:', result1.password);
            const passwordMatch = await bcrypt.compare(req.body.pw, result1.password);
            console.log('Password match:', passwordMatch);
    
            if (passwordMatch) {
                res.send("Login Success");
            } else {
                res.send("Login Failed: Incorrect password");
            }
        } else {
            res.send("Login Failed: User not found");
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/update', async (req, res) => {
    try {
        const result2 = await col.findOne({ 'name': req.body.un }); 
        if (result2.name == req.body.un) {
            if (await bcrypt.compare(req.body.pw, result2.password)) {
                const newPasswordHash = await bcrypt.hash(req.body.pwd, 5);
                await col.updateOne({ 'password': result2.password }, { $set: { 'password': newPasswordHash } });
                res.send("Updated successfully");
            } else {
                res.status(400).send("Update failed: Incorrect existing password");
            }
        } else {
            res.status(404).send("Update failed: User not found");
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send("Update failed: Internal Server Error");
    }
});

app.post('/delete', async (req, res) => {
    
    const result2 = await col.findOne({ 'name': req.body.un }); 
    console.log(result2)
    console.log(req.body.un)
    if (result2.name == req.body.un) {
            console.log("hello")
           await col.deleteOne({ 'name': req.body.un });
            res.send("Deleted successfully");
        }
         else {
            res.send("Not Deleted");
        }
    
});





app.listen(8081);
console.log("Server Running....");



app.get('/showall',async(req,res)=>{
    const result = await col.find().toArray();
    res.send(result);
})