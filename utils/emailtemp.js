const nodemailer = require("nodemailer");
const { google } = require("googleapis");

var transporter;
const setUp = async () => {
	const oAuth2Client = new google.auth.OAuth2(
		process.env.CLIENT_ID,
		process.env.CLIENT_SECRET,
		process.env.REDIRECT_URI
	);
	oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

	const accessToken = await oAuth2Client.getAccessToken();
	const MAIL_SETTINGS = {
		service: "gmail",

		auth: {
			type: "OAuth2",
			user: process.env.EMAIL_FROM,
			// pass: process.env.EMAIL_PASSWORD,
			clientId: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			refreshToken: process.env.REFRESH_TOKEN,
			accessToken: accessToken,
		},
	};

	 transporter = nodemailer.createTransport(MAIL_SETTINGS);
};
setUp()
exports.sendMail = async (to, otp) => {
	try {
		let info = await transporter.sendMail({
			from: process.env.EMAIL_FROM,
			to: to,
			  subject: 'Email verify',
			html: `
      <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2>Welcome to the MathonGo.</h2>
            
        <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
        <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${otp}</h1>
   </div>
    `,
		});
		return info;
	} catch (error) {
		console.log(error);
		return false;
	}
};

exports.resetPassMail = async (to, token) => {
	try {
		let info = await transporter.sendMail({
			from: process.env.EMAIL_FROM,
			to: to,
			  subject: 'Reset Password',
			html: `
      <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2>Welcome to the MathonGo.</h2>
            
        <p style="margin-bottom: 30px;">Use this link to reset password</p>
        <htth1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${token}</htth1>
   </div>
    `,
		});
		return info;
	} catch (error) {
		console.log(error);
		return false;
	}
};
