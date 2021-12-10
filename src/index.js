const express=require('express')
require("./db/mongoose")
// const {User}=require('./models/user')
const Task=require('./models/task') 
const { findByIdAndUpdate } = require('./models/user')
const userRouter=require('./routers/user')
const taskRouter=require('./routers/task')
const auth=require('./middleware/auth')

const app=express()
const port=process.env.PORT


// app.use((req,res,next)=>{
//   res.status(503).send('Under maintanace')
// })
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port,()=>{
  console.log('Server is up on '+port)
})

const task=require('./models/task')
const User=require('./models/user')

