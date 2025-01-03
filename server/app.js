require("dotenv").config()
const express = require('express');
const app = express();
const port = 5000

const cors = require("cors")

app.use(cors({
    origin: 'http://localhost:5173', // Allow frontend from localhost:5173
    methods: 'GET,POST,PUT,DELETE', // Allow specific HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Allow specific headers
  }));

//db connection
const dbConnection = require("./db/dbConfig")


//user routers middleware file
const userRoutes = require("./routes/userRoute")

//question routes middleware file
const questionsRoutes = require("./routes/questionRoute"); 
//authenthication middleware file
const authMiddleware = require('./middleware/authMiddleware');
//json middleware to extract json data

app.use(express.json())


//user routes middleware
app.use("/api/users",userRoutes)

// questions routes middleware
app.use("/api/questions",authMiddleware,questionsRoutes)

//answers routes middleware
async function start() {
   try {
    const result = await dbConnection.execute("select 'test' ")
    await app.listen(port)
    console.log("database connection established");
    console.log(`listening on ${port}`)
       
} catch (error) {
    console.log(error.message)
} 
}
start()





