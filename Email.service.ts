import { User } from "./models/index"
import nodemailer from 'nodemailer'
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "letsdev.dev@gmail.com", // Your email address
      pass: "ntrpbsbzfxzuamfo"
    }
  });

export class EmailService {
    constructor({model = User}) { }

    /**
	 * Service to store user location
	 * @param userId
	 * @param location
	 * @returns {Promise<Document<any, any, unknown> & {}>}
	 */
	async sendEmail(email: string, verifyLink: string) {
		try {
              const mailOptions = {
                from: 'letsdev.dev@gmail.com', // Sender's email address
                to: `${email}`, // Recipient's email address
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
}

