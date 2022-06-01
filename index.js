require("dotenv").config()

const express=require("express")
const cors=require("cors")
const app=express()
const port=process.env.PORT||4000
const userRoutes=require("./routes/userRoutes")
const mongoose=require("mongoose")
app.use(
	cors({
		origin: "*",
	})
);

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(()=>{
    console.log("MongoDb is connected");
}).catch(()=>{
    console.log("MongoDb is not connected");
})
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(express.json({ limit: "50mb" }));

app.use("/api/user",userRoutes)

app.get("/",(req,res)=>{
    res.json("Home")
})

app.listen(port,()=>{
    console.log(`Server listens at http://localhost:${port}`);
})
