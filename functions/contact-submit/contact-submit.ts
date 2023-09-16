import { Handler } from '@netlify/functions'
require('dotenv').config()

const { AWS_ACCESS_KEY_ID_WGV, AWS_SECRET_KEY_ID_WGV, AWS_REGION_WGV } = process.env;

const TO_EMAIL = 'carly@wildgracevideography.com';
const FROM_EMAIL = 'info@wildgracevideography.com';

export const handler: Handler = async (event, context) => {
  const AWS = require("aws-sdk");
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
      headers: { 'Allow': 'POST' }
    };
  }

  if (event.body == null) {
    return { statusCode: 422, body: 'Name, email, and message are required.' };
  }
  
  const data = JSON.parse(event.body);

  if (data == null || !data.message || !data.firstname || !data.lastname || !data.email) {
    return { statusCode: 422, body: 'Name, email, and message are required.' };
  }

  AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID_WGV,
    secretAccessKey: AWS_SECRET_KEY_ID_WGV,
    region: AWS_REGION_WGV
  });

  const ses = new AWS.SES({ apiVersion: "2010-12-01" })
  const params = {
      Destination: {
        ToAddresses: [TO_EMAIL]
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data:
              `<html>
                  <body>
                    First Name: ${data.firstname}
                    <br />
                    Last Name: ${data.lastname}
                    <br />
                    Email: ${data.email}
                    <br />
                    Message: ${data.message}
                  </body>
              </html>`
          },
          Text: {
            Charset: "UTF-8",
            Data: ""
          }
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Wild Grace Videography Contact Form"
        }
      },
      Source: FROM_EMAIL
    }

    return ses.sendEmail(params).promise().then((data: any) => {
        console.log("email submitted to SES", data);
        return {
          statusCode: 200,
          body: `Message sent`,
        };
      })
      .catch((error: any) => {
        console.log(error);
        return {
          statusCode: 500,
          body: `Message unsuccesfully sent, error: ${error}`,
        };
    }); 
}
