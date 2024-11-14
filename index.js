//loads env file contents into process.env by default

require('dotenv').config()
const express=require('express')
const cors=require('cors')
const router=require('./Router/router')

const pfserver=express()
pfserver.use(cors())
pfserver.use(express.json())
pfserver.use(router)
pfserver.use('/uploads',express.static('./uploads'))
require('./DB/connection')
const PORT= 3000 || process.env.PORT
pfserver.listen(PORT,()=>{
    console.log(`pfserver started running at PORT:${PORT}`);
    
})

pfserver.get('/',(req,res)=>{
    res.send("<h1>Project-Fair server is running....</h1>")
})
