import express from 'express'

import dotenv from 'dotenv'
dotenv.config()
let prot =process.env.PORT || 6000 


let port =8000


let app= express()





app.listen(port,()=>{
    console.log("Hello from server")
})