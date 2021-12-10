const mailgun=require('mailgun-js')
const DOMAIN='sandbox3c2522e8f65a46e2b45a8ef9f0c277c6.mailgun.org'
const mg=mailgun({apiKey: process.env.API_KEY, domain: DOMAIN})

// const data = {
// 	from: 'unkwown@gmail.com',
// 	to: 'deathofsuper@gmail.com',
// 	subject: 'new email',
// 	text: 'Testing some Mailgun awesomness!'
// }
// mg.messages().send(data, function (error, body) {
// 	console.log(body);
// })
const sendWelcomeEmail=(email,name)=>{
  mg.messages().send({
    from:'TaskApp@gmail.com',
    to:email,
    subject:'Thanks for joining in!',
    text:`Welcome to the app, ${name}.`
  },function(error,body){
    console.log(body)
  })
}
const cancelationEmail=(email,name)=>{
  mg.messages().send({
     from:'TaskApp@gmail.com',
     to:email,
     subject:'Goodbye',
     text:`Why did you do this to us ${name}`
  },function(error,body){
    console.log(body)
  })
}


module.exports={
  sendWelcomeEmail,
  cancelationEmail
}