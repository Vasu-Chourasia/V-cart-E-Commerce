import mongoose from 'mongoose';

const connectDb= asyn() => {
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB connected")
    }
    catch(error){

    }
}