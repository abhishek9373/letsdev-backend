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
                text : `Dear ${email},

                Thank you for signing up for Letsdev! We're excited to have you join our vibrant community of developers and tech enthusiasts. To complete your registration and enjoy all the amazing features our platform offers, we kindly ask you to verify your email address.
                
                Please follow the simple steps below to verify your email:
                
                Click on the following link (or copy and paste it into your browser's address bar): ${verifyLink}
                
                Once the link opens, your email address will be automatically verified, and you'll gain full access to Letsdev.
                
                By verifying your email, you'll be able to:
                
                Create and engage with posts, discussions, and questions in our tech-savvy community.
                Connect with fellow developers, collaborate on projects, and share knowledge.
                Explore job listings tailored to your skills and preferences.
                And much more!
                If you did not register for Letsdev, please disregard this email. Your account will not be activated until you verify your email.
                Best regards,

                Letsdev Team`
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

