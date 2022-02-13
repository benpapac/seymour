const mailjet = require ('node-mailjet')
.connect('60659a026f095897b2e1a06d5598cb2d', '9eeb4abf655660fdabeeb7b02c4640cd')
export const request = mailjet
.post("send", {'version': 'v3.1'})
.request({
  "Messages":[
    {
      "From": {
        "Email": "ben.papac@gmail.com",
        "Name": "Ben"
      },
      "To": [
        {
          "Email": "ben.papac@gmail.com",
          "Name": "Ben"
        }
      ],
      "Subject": "Greetings from Mailjet.",
      "TextPart": "My first Mailjet email",
      "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
      "CustomID": "AppGettingStartedTest"
    }
  ]
})
request
  .then((result) => {
    console.log(result.body)
  })
  .catch((err) => {
    console.log(err.statusCode)
  })
