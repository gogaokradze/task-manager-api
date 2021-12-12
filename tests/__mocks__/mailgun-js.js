class Mailgun {
  send() {
  }
  

  messages() {
    return this
  }
}

const mailgun = () => new Mailgun()

module.exports = mailgun