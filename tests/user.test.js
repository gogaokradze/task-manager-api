const request=require('supertest')
const app=require('../src/app')
const User=require('../src/models/user')
const{userOneId,userOne,setupDatabase}=require('./fixtures/db')

beforeEach(setupDatabase)

test('Should sign up a new user',async()=>{
   const response = await request(app).post('/users').send({
     name:'random',
     email:'randomrandom@gmail.com',
     password:'yourmajesty'
   }).expect(201)
  //Assert that database was changed correctly
  const user=await User.findById(response.body.user._id)
  expect(user).not.toBeNull()
   expect(response.body).toMatchObject({
     user:{
       name:'random',
       email:'randomrandom@gmail.com'
     },
     token:user.tokens[0].token
   })
   expect(user.password).not.toBe('yourmajesty')
})

test('Should log in as userOne',async()=>{
  const response = await request(app).post('/users/login').send({
    email:userOne.email,
    password:userOne.password
  }).expect(200)
  const user=await User.findById(userOneId)
  expect(response.body.token).toBe(user.tokens[1].token)
})

test('should not login with nonexistent user',async()=>{
  await request(app).post('/users/login').send({
    email:'dummyemail@gmail.com',
    password:'hahagetrekt'
  }).expect(400)
})

test('Should get profile info for user',async()=>{
  await request(app)
  .get('/users/me')
  .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
  .send()
  .expect(200)
})

test('Should not get profile info when unauthenticated',async()=>{
  await request(app)
  .get('/users/me')
  .send()
  .expect(401)
})

test('should delete account when authenticated',async()=>{
   await request(app)
  .delete('/users/me')
  .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
  .send()
  .expect(200)
  const user=await User.findById(userOneId)
  expect(user).toBeNull()
})

test('Should not delete account for unathenticated user',async()=>{
  await request(app)
  .delete('/users/me')
  .send()
  .expect(401)
})
test('Should upload avatar image',async()=>{
  await request(app)
  .post('/users/me/avatar')
  .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
  .attach('avatar','tests/fixtures/profile-pic.jpg')
  .expect(200)
  const user=await User.findById(userOneId)
  expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields',async()=>{
  await request(app)
  .patch('/users/me')
  .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
  .send({
    name:'updated name'
  })
  .expect(200)
})

test('Should not update invalid user fields',async()=>{
  await request(app)
  .patch('/users/me')
  .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
  .send({
    location:'wonderland'
  })
  .expect(400)
})