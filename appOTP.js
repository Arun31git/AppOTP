const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/OTP.html');
});

// Handle POST request to generate OTP
app.post('/generate-otp', (req, res) => {
    const accountSid = '';
    const authToken = '';
    const client = twilio(accountSid, authToken);
    const phone = req.body.Phone;
    const otp = Math.floor(1000 + Math.random() * 9000);

    client.messages
          .create({from: '', body: 'YOUR OTP IS ' + otp, to: phone})
          .then(message => {
              console.log('OTP sent:', message.sid);
              res.json({ success: true, message: 'OTP sent successfully' });
          })
          .catch(err => {
              console.error('Error sending OTP:', err);
              res.json({ success: false, message: 'Failed to send OTP' });
          });
});




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});