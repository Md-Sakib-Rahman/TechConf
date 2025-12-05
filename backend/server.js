require('dotenv').config()
const express = require('express')
const cors = require('cors')

const mongoose= require('mongoose')
const app = express()
const port = process.env.PORT || 5000
const User=  require('./Models/User')
const Event= require('./Models/Event')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors())
app.use(express.json())
const verifyToken = require('./middleware/auth');
// mongoose.connect(process.env.MONGO_URI).then(()=>{
//     console.log('Connected to DB')
// }).catch(err => {
//     console.log(err)
// })
let isConnected = false;

const connectDB = async () => {
    // 1. Check if we already have a connection (Cache)
    if (isConnected) return;

    // 2. Check Mongoose's internal state
    if (mongoose.connection.readyState === 1) {
        isConnected = true;
        return;
    }

    // 3. Establish new connection
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'techconfDB', // Optional: forces specific DB name
            serverSelectionTimeoutMS: 5000 // Fail fast if network is down
        });
        isConnected = true;
        console.log("=> 🟢 MongoDB Connected Successfully");
    } catch (err) {
        console.error("=> 🔴 MongoDB Connection Failed:", err.message);
        throw err; // Stop request if DB fails
    }
};

// GLOBAL MIDDLEWARE: Force DB Connection before ANY route
// This prevents "buffering timed out" because we AWAIT the connection here.
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        res.status(500).json({ message: "Database Connection Error" });
    }
});


app.get('/api/all-events', async (req, res)=>{

    try{
        const result = await Event.find()
        res.status(200).json(result)
    }catch(err){
        console.log(err)
        res.status(500).json({ message: "Server Error" });
    }

})
app.get('/api/event/:id', async (req, res)=>{
    const id = req.params.id;
    const queury = {
        _id:id
    }
    try{
        const result = await Event.findOne(queury).populate('added_by', 'email name imageURL')
        res.status(200).json(result)
    }catch(err){
        console.log(err)
        res.status(500).json({ message: "Server Error" });
    }

})

app.get('/api/myaddedEvent', verifyToken, async (req, res)=>{
    const id = req.user._id;

    try{
        const result = await Event.find({added_by: id})
        res.status(200).json(result)
    }catch(err){
        console.log(err)
        res.status(500).json({ message: "Server Error" });
    }
})

app.post("/api/auth/login", async (req, res)=>{
    
    const {email, password} = req.body;
    console.log("login creds: ", email, password)
    try{
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({message : "user not found"})
        if (!user.password) return res.status(400).json({message: "Login with Google"})
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return  res.status(400).json({message: "Invalid credentials"})  
        const token = jwt.sign({
            _id: user._id, 
            email: user.email
        },
        JWT_SECRET,
        { expiresIn: '1h' }
        )
        console.log("success login :", res)
        res.status(200).json({ token, user: { name: user.name, email: user.email, imageURL: user.imageURL } })    
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Server Error" });  
    }

})
app.post('/api/auth/googleSignin', async (req, res)=>{
    const { email, name, imageURL } = req.body;
    try{
        const existingUser = await User.findOne({email})
        if(existingUser){
            const token = jwt.sign(
                {
                    _id: existingUser._id,
                    email: existingUser.email,

                },
                JWT_SECRET,
                { expiresIn: '1h' }
            )
            return res.json({ token, user: existingUser });
        }
        const user = new User({
            name,
            email,
            password: null,
            imageURL,
            provider:'google'
        })
        await user.save()
        const token = jwt.sign(
                {
                    _id: user._id,
                    email: user.email,

                },
                JWT_SECRET,
                { expiresIn: '1h' }
            )
        res.status(200).json({token, user})    

    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }

})

app.post('/api/auth/signup', async (req, res)=>{
    const {email, password, name, imageURL} = req.body;
    console.log("signup creds: ", email, password)
    try{
        const user = await User.findOne({email})
        if(user) return res.status(400).json({ message: "User already exists" })
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const newuser = new User(
            {
            name,
            email,
            password: hashedPassword,
            imageURL,
            provider:'credentials'      
            }
        )    
        await newuser.save()
        
        res.status(200).json({message: "User Created"})
    }catch(err){
        console.log(err)
        res.status(500).json({ message: "Server Error" });
    }
})


app.post("/api/addEvent", verifyToken, async (req, res)=>{

    try{

        const newEvent = new Event({
            ...req.body,
            added_by : req.user._id
        })    

        await newEvent.save();
        res.status(201).json(newEvent);
    }catch(err){
        console.log(err)
        res.status(500).json({ message: "Server Error" });
    }

})

app.delete('/api/delete-event/:id', verifyToken ,async (req, res)=>{
    const eventid = req.params.id;
    const userid = req.user._id;
    
    const queury = {
        _id:eventid
    }
    try{
        const event = await Event.findOne(queury)
        if(!event) return res.status(400).json({message: "Event not found"})
        if(event.added_by.toString() !== userid )  return res.status(403).json({message: "unauthorized request"})  
        await Event.findByIdAndDelete(eventid);  
        res.status(200).json({ message: "Event deleted successfully" });  
     }catch(err){
        console.log(err)
        res.status(500).json({ message: "Server Error" });
    }

})

app.get('/', (req, res) => {
  res.send('TechConf Server is Running!')
})

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })
}
module.exports = app;
