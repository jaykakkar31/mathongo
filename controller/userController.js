const asyncHandler = require("express-async-handler");
const { User } = require("../model/user");
const { generateToken } = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
// const otpGenerator = require("../utils/otpgenerator");
const res = require("express/lib/response");
const otpGenerator = require("otp-generator");
const crypto = require("crypto");

const { sendMail, resetPassMail } = require("../utils/emailtemp");
exports.signup = asyncHandler(async (req, res) => {
	// otpgenerator();
	const otp = otpGenerator.generate(5, {
		upperCaseAlphabets: false,
		lowerCaseAlphabets: false,
		specialChars: false,
	});

	// res.send("reached")
	const userExist = await User.findOne({ email: req.body.email });
	if (userExist) {
		res.status(401);
		throw new Error("User already exist");
	} else {
		try {
			// otpgenerator()
			const newUser = await User.create({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				password: req.body.password,
				otp: otp,
			});
			sendMail(req.body.email, otp)
				.then((response) => {
					console.log(response, "Mail sent");
				})
				.catch((e) => {
					console.log("Failed to send mail", e);
				});
			// newUser.select("-opt")
			if (newUser) {
				res.status(200).json(newUser);
			} else {
				res.status(400);
				throw new Error("User not Found");
			}
		} catch (error) {
			res.status(400);
			throw new Error("Unable to create new user");
		}

		// newUser.token= generateToken(user._id),

		// if (newUser) {
		// 	// const url = `${req.protocol}://${req.get(
		// 	// 	"host"
		// 	// )}/api/users/verified/${activationToken}`;
		// 	const url = `https://vrdoor.netlify.app/activateuser?activate=${activationToken}`;

		// 	await new Email(newUser, url).sendActivationEmail();

		// 	res.status(200).json(newUser);
		// } else {
		// 	res.status(400);
		// 	throw new Error("User not found");
		// }
	}
});

exports.verifyEmail = async (req, res) => {
	const { email, otp } = req.body;
	const user = await User.findOne({
		email,
	});
	if (!user) {
		res.status(400);
		throw new Error("User not found");
	}
	if (user && user.otp !== otp) {
		res.status(400);
		// throw new Error("Invalid OTP");
		res.json("Invalid OTP");
	} else {
		user.active = true;
		user.otp = null;
		await user.save({ validateBeforeSave: false });
		res.status(200).json(user);
	}

	// console.log(updatedUser);
};

// const validateUserSignUp = async (email, otp) => {

// 	console.log(updatedUser);

// };

exports.login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	// console.log(req.body, "AUTH");
	const user = await User.findOne({ email: email });

	if (!user) {
		res.status(404);
		throw new Error("User not found");
	}

	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(200).json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error("Invalid email or password");
	}
});

exports.logout = asyncHandler(async (req, res) => {
	const { email } = req.body;
	// console.log(req.body, "AUTH");
	const user = await User.findOne({ email: email });

	if (!user) {
		res.status(404);
		throw new Error("User not found");
	}

	if (user) {
		user.token = null;
		await user.save({ validateBeforeSave: false });

		res.status(200).json(newUser);
	} else {
		res.status(401);
		throw new Error("Invalid email ");
	}
});

exports.forgotPassword = asyncHandler(async (req, res) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		res.status(400);
		res.json("User not found with this email!");
		throw new Error("User not found with this email!");
	}

	const resetToken = user.createPasswordResetToken();

	await user.save({ validateBeforeSave: false });

	try {
		const resetURL = `http://localhost:4000/resetPassword/${resetToken}`;
		resetPassMail(req.body.email, resetURL);

		res.status(200).json({
			status: "success",
			message: "Token sent to email!",
		});
	} catch (err) {
		user.passwordResetToken = undefined;
		await user.save({ validateBeforeSave: false });
		res.status(500);
		throw new Error(err.message);
	}
});

exports.resetPassword = asyncHandler(async (req, res) => {
	const hashedToken = crypto
		.createHash("sha256")
		.update(req.params.token)
		.digest("hex");
	console.log(hashedToken);
	const user = await User.findOne({
		passwordResetToken: hashedToken,
	});

	if (!user) {
		res.status(400);
		throw new Error("Your token has expired or is invalid!");
	}

	user.password = req.body.password;
	user.passwordResetToken = undefined;

	await user.save();

	res.status(200).json({
		status: "success",
		user,
		message: "Password updated",
	});
});
