
const SibMailSdk = require('sib-api-v3-sdk')
const express = require('express')
const router = express.Router();
require('dotenv').config()

router.post('/sendmail', sendMailGuest)

const client = SibMailSdk.ApiClient.instance
const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.API_MAIL
const joinSpacesStr = (str) => str.replace(/\s/g,'')

function sendMailGuest(req, res, next) {
    try{
        const transactionalEmailApi = new SibMailSdk.TransactionalEmailsApi()

         transactionalEmailApi.sendTransacEmail({
                subject: `Benvingut a la subscripció del grup {{ params.name }}`,
                sender: { email: req.body.sender },
                to: [{email: req.body.to }],
                htmlContent: `
                    <h3>Hola {{ params.user }}</h3>
                    <p>Aquí tens el teu códig per accedir al grup</p>
                    <div style="border: 2px solid; background: white; padding: 10px; margin-top: 5px; margin-bottom: 5px; font-family: monospace; font-weight: bold; letter-spacing: 0.1rem; width: 30%; text-align: center">{{ params.code }}</div>
                    <a href='http://localhost:3000/'>App friends invisible</a>
                `,
                params: {
                  name: req.body.name,
                  user: req.body.user,
                  code: 'CODE-'+joinSpacesStr(req.body.name)+'-00'+req.body.idAdmin+'490'

                },
            })
            .then(console.log)
            .catch(console.log)
        
    }catch(error){
        next(error)
    }
}

module.exports = router