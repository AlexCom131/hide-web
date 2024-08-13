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
        user: '********', 
        pass: '*********'                 
    }
});

app.post('/send-email', (req, res) => {
    const { email, message } = req.body;

    const mailOptions = {
        from: '********', 
        to: '***********', 
        subject: 'Письмо с сайта',
        text: `Почта- ${email}\n\nТекст-${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('От халепа!!! Помилка надсилання листа');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Лист надіслано');
        }
    });
});

const PORT = 1000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
