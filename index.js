const express = require('express');
const app = express();

const config = require('./config')
const port = 3000;

const client = require("twilio")(config.accountSID, config.authToken)

app.get('/login', (req, res)=> {
    client.verify.services(config.serviceID)
             .verifications
             .create({to: `+234${req.query.phonenumber}`, channel: 'sms'})
             .then(verification => res.status(200).json(verification))
             .catch(err=>{
                 res.status(500).json(err)
             });
})

app.get('/verify', (req, res)=> {
    client.verify.services(config.serviceID)
      .verificationChecks
      .create({to: `+234${req.query.phonenumber}`, code: `+234${req.query.code}`})
      .then(verification_check => 
        res.status(200).json(verification_check))
        .catch(err=>{
            res.status(500).json(err)
        });
})


app.listen(port, () => {
    console.log(`Server is running at ${port}`)
})