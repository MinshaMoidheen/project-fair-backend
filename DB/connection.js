const mongoose=require("mongoose")

const connection_string=process.env.connection_string

mongoose.connect(connection_string).then(()=>{
    console.log('Project fair is connected to mongoDB atlas');
    
}).catch((err)=>{
    console.log("connection failed",err);
    
})