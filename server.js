const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '1111@gmail.com', 
        pass: '11111'                 
    }
});

app.post('/send-email', (req, res) => {
    const { email, message } = req.body;

    const mailOptions = {
        from: '1111@gmail.com', 
        to: '1111@gmail.com', 
        subject: 'Письмо с сайта',
        text: `Почта- ${email}\n\nТекст-${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Oh no!!! Error sending the email.');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('The letter has been sent');
        }
    });
});

const PORT = 1000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
