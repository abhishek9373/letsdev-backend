import nodemailer from 'nodemailer'
import nconf from "./lib/config";

const configs = nconf.get('platFormEmail');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: configs.email,
      pass: configs.pass
    }
  });

export class EmailService {
    /**
	 * Service to store user location
	 * @param userId
	 * @param location
	 * @returns {Promise<Document<any, any, unknown> & {}>}
	 */
	async sendEmail(email: string, verifyLink: string) {
		try {
              const mailOptions = {
                from: configs.email,
                to: `${email}`,
                subject: 'verify your email for letsdev',
                html :`<!doctype html>
                <html>
                <head>
                  <meta name="viewport" content="width=device-width" />
                  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                  <title>verify your email to onboard</title>
                  <style>
                    /* Your existing styles */
                
                    /* Centered image */
                    .centered-image {
                      text-align: center;
                    }
                
                    /* Button */
                    .button {
                      text-align: center;
                      margin-top: 20px;
                    }
                    .button a {
                      display: inline-block;
                      background-color: #3498db;
                      color: #fff;
                      text-decoration: none;
                      padding: 12px 25px;
                      font-weight: bold;
                      border-radius: 5px;
                    }
                  </style>
                </head>
                <body>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
                    <tr>
                      <td>&nbsp;</td>
                      <td class="container">
                        <div class="content">
                          <table role="presentation" class="main">
                            <tr>
                              <td class="wrapper">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <!-- Button -->
                                      <div class="button">
                                        <a href="${verifyLink}">click to verify</a>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </div>
                      </td>
                    </tr>
                  </table>
                </body>
                </html>
                `
              };

              transporter.sendMail(mailOptions, (error: any, info: any) => {
                if (error) {
                  throw(error)
                } else {
                  return true;
                }
            });

			return {data : true}
		} catch (error) {
		    throw (error);
		}
	}

  async sendConnectionEmail(email: string, username: string, userId: string) {
		try {
              const mailOptions = {
                from: configs.email,
                to: `${email}`,
                subject: `You have a new message from ${username}`,
                text: `Hello,
              
              You have a new message from ${username} 
              on Letsdev. 

              click to Reply your new connection 

              https://devbuilder.tech/chats/${userId}
        
              Best regards,
              Your Platform Team`,
              };

              transporter.sendMail(mailOptions, (error: any, info: any) => {
                if (error) {
                  throw(error)
                } else {
                  return true;
                }
            });

			return {data : true}
		} catch (error) {
		    throw (error);
		}
	}
}

