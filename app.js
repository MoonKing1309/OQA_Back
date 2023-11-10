const express = require('express')
const cors = require("cors");
const app = express();
const body_parser = require("body-parser");
const playRouter = require('./route/playRouter')
const connectDB = require('./data/playConnect')


app.use(body_parser.json())
app.use(body_parser.urlencoded({extended:true}));
app.use(cors()); 

app.use('/play',playRouter)

const serverStart = async ()=>{
    try {
        await connectDB("mongodb+srv://root:root@backenddatabase.3g168cl.mongodb.net/quizDatabase");
        console.log("Connected to Database")
        app.listen(5001,()=>{
            console.log("Server started on 5001")
        })
        
    } catch (error) {
        console.log(error)
    }

}

serverStart()