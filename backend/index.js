import express from 'express'

import dotenv from 'dotenv'
dotenv.config()
let prot =process.env.PORT || 6000 

import connectDb from './config/db.js'

let port =8000


let app= express()


app.get("/", (req,res)=>{
    res.send("hello from server")
})


app.listen(port,()=>{
    console.log("Hello from server")
    connectDb()
})