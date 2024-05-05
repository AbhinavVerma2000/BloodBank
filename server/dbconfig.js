const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI)
const connection = mongoose.connection
connection.on('connected',()=>{
    console.log('Mongodb connection successful')
})
connection.on('error',(err)=>{
    console.log('Mongodb connection error', err)
})