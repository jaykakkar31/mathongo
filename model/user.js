const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto=require("crypto")
const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		require: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
	},
	token: {
		type: String,
		default: null,
	},
	otp: {
		type: String,
	},
	active: {
		type: Boolean,
		default: false,
	},
	passwordResetToken: {
		type: String,
	},
});
UserSchema.pre("save", async function (next) {
	// Only run this function if password was actually modified
	if (!this.isModified("password")) {
        console.log("CALLEd");
        return next();}

	// Hash the password with cost of 12

	this.password = await bcrypt.hash(this.password, 12);

	next();
});
UserSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString("hex");

	this.passwordResetToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	// console.log({ resetToken }, this.passwordResetToken);

	return resetToken;
};

const User = mongoose.model("User", UserSchema);

exports.User = User;
