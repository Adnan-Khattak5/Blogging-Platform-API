const express = require("express")
const mongoose  =require("mongoose")
const app = express();

const Userrouter = require("./Routes/UserRoutes");
const UserInteractionrouter = require("./Routes/UserInterationRoutes");
const AdminRoutes = require("./Routes/AdminRoutes");
app.use(express.json())
const cors = require("cors")
require("dotenv").config()
app.listen(3000)
app.use(cors({
    origin:'*'
}))

app.use("/user" ,  Userrouter)
app.use("/admin", AdminRoutes)
app.use("/usser", UserInteractionrouter)

app.get("/" , (req , res)=>{
    res.json({"Message":"Hello"})
})

mongoose.connect(process.env.MONGODB_STRING).then(()=>{
    console.log("DB Connected")
}).catch(err=>{
    console.log(err)
})
