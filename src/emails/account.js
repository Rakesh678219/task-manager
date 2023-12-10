/** @format */

const api_key = "45249dca6b019ebbddd256c0b0232ac4-0a688b4a-e84ceb08";
var domain = "sandboxcea4b04c46764a6a9c5c798c46d3d984.mailgun.org";
var mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });

const sendWelcomeEmail = (email, name) => {
  var welcomeData = {
    from: "rakesh@sandboxcea4b04c46764a6a9c5c798c46d3d984.mailgun.org",
    to: email,
    subject: "Welcome to task manager !",
    text: `Welcome to task manager app , ${name} . Let me know how you get along with the app`,
  };
  mailgun.messages().send(welcomeData, function (error, body) {
    console.log(body);
  });
};
const sendCancelationEmail = (email, name) => {
  var cancelationData = {
    from: "rakesh@sandboxcea4b04c46764a6a9c5c798c46d3d984.mailgun.org",
    to: email,
    subject: "Good Bye !",
    text: `Thanks , ${name} . Let us know how to imporove the app further`,
  };
  mailgun.messages().send(cancelationData, function (error, body) {
    console.log(body);
  });
};
module.exports = { sendWelcomeEmail, sendCancelationEmail };
