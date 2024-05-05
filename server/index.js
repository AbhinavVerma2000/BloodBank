const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000;
const dbconfig = require('./dbconfig')
app.use(cors(
    {
        origin: 'https://blood-bank-seven-weld.vercel.app/'
    }
))
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