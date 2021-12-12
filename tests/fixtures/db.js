const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const User=require('../../src/models/user')
const Task=require('../../src/models/task')

const userOneId=new mongoose.Types.ObjectId()
const userOne={
  _id:userOneId,
  name:'Mike',
  email:'mikemike@gmail.com',
  password:'yourmajestypehya',
  tokens:[{
    token:jwt.sign({_id:userOneId},process.env.JWT_SECRET)
  }]
}

const userTwoId=new mongoose.Types.ObjectId()
const userTwo={
  _id:userTwoId,
  name:'Tartaglia',
  email:'tartaglia@gmail.com',
  password:'yourmajestypehya',
  tokens:[{
    token:jwt.sign({_id:userTwoId},process.env.JWT_SECRET)
  }]
}

const taskOne={
  _id:new mongoose.Types.ObjectId(),
  description:'to clean',
  owner:userOne._id
}

const taskTwo={
  _id:new mongoose.Types.ObjectId(),
  description:'to buy second task',
  owner:userOne._id
}
const taskThree={
  _id:new mongoose.Types.ObjectId(),
  description:'to buy third dask' ,
  owner:userTwo._id
}

const setupDatabase=async()=>{
  await User.deleteMany()
  await Task.deleteMany()
  await new User(userOne).save()
  await new User(userTwo).save() 
  await new Task(taskOne).save()
  await new Task(taskTwo).save()
  await new Task(taskThree).save()
}
module.exports={
  userOneId,
  userOne,
  setupDatabase,
  userTwoId,
  userTwo,
  taskOne,
  taskTwo,
  taskThree
}