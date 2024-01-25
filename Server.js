const express=require ("express")
const connectdb = require("./configuration/Config")
const userrouter=require("./router/Router")
const cors = require("cors")
const app=express()
const port=6000
app.use(express.json())
connectdb()
app.use("/user",userrouter)
app.use(cors({origin:"http://localhost:3000"}))
app.listen(port,console.log("server is running"))
     