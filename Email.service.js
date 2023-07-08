const { User } = require("../../../models")
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "abhishek.househub@gmail.com", // Your email address
      pass: "wpidcwwbygzbpqmz" // Your email password or app-specific password
    }
  });

class EmailService {
    constructor({model = User}) { }

    /**
	 * Service to store user location
	 * @param userId
	 * @param location
	 * @returns {Promise<Document<any, any, unknown> & {}>}
	 */
	async sendEmail() {
		try {
              const mailOptions = {
                from: 'abhishek.househub@gmail.com', // Sender's email address
                to: 'abhishekgund500@gmail.com', // Recipient's email address
                subject: 'New flat notification for platform Admin', // Email subject
                html :`<!doctype html>
                <html>
                <head>
                  <meta name="viewport" content="width=device-width" />
                  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                  <title>New flat notification for platform Admin</title>
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
                                      <!-- Centered image -->
                                      <div class="centered-image">
                                        <img src="https://img.freepik.com/free-photo/aerial-beautiful-shot-seashore-with-hills-background-sunset_181624-24143.jpg?w=1060&t=st=1686515375~exp=1686515975~hmac=f91951970d9d94365d88236c2b538818e5a562996762de729ac28df9d5cd7d58" alt="Image">
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <!-- Button -->
                                      <div class="button">
                                        <a href="your-button-link">Show more details of flat owner</a>
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
                ` // Email content in plain text
              };

              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.error('Error sending email:', error);
                } else {
                  console.log('Email sent:', info.response);
                }
            });

			return {data : true}
		} catch (error) {
		    throw (error);
		}
	}
}

module.exports = EmailService;
