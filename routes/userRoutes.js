const express = require("express");

const userRouter=express.Router()
const {login,signup, logout, verifyEmail, forgotPassword, resetPassword}=require("../controller/userController")
userRouter.post("/login",login)
userRouter.post("/signup",signup)
userRouter.patch("/logout",logout)
userRouter.patch("/verifyemail",verifyEmail)
userRouter.post("/forgotPassword", forgotPassword);
userRouter.patch("/resetPassword/:token", resetPassword);
module.exports=userRouter
