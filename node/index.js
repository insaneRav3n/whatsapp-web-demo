var express = require('express');
var app = express();
const qrcode = require('qrcode-terminal');
const { Client,LocalAuth } = require('whatsapp-web.js');
var port = '3000';

const puppeteerOptions = {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-extensions']
};


const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: puppeteerOptions

});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');

});
app.get("/wa", function(req, res) {
    const num = req.query.num;
    var msg = req.query.msg;
    console.log(msg);
    console.log(num);
      // Getting chatId from the number.
     // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
    const chatId = num.substring(1) + "@c.us";
    // Sending message.
    client.sendMessage(chatId, msg);
    console.log('1 Message Sent' );
    res.end('Successful');
  // });
});
app.listen(port);
client.initialize();
