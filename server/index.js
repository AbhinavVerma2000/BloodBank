const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000;
const dbconfig = require('./dbconfig')
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://blood-bank-seven-weld.vercel.app/"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })
app.use(express.json())
const usersRoute = require('./routes/usersRoute')
const invRoute = require('./routes/invRoute')
const dashboardRoute = require('./routes/dashboardRoute')
app.use('/api/users', usersRoute)
app.use('/api/inventory', invRoute)
app.use('/api/dashboard', dashboardRoute)
// const path = require('path')
// __dirname = path.resolve()
// if (process.env.NODE_ENV==="production") {
//     app.use(express.static(path.join(__dirname,'/client/build')))
//     app.get('*',(req, res)=>{
//         res.sendFile(path.join(__dirname, 'client','build','index.html'))
//     })
// }
app.listen(port, ()=>console.log(`Server started at ${port}`))