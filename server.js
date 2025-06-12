const express=require('express')
const app=express()
const cors=require('cors')
const mongoose=require('mongoose')
const PORT=5000
const authRoutes=require("./routes/auth")
const bookRoutes=require("./routes/bookroute")
app.use(express.json())
app.use(cors())

app.use(express.json())
mongoose.connect("mongodb+srv://Ramya:Ramya@cluster0.gf8mg.mongodb.net/bookstore?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("database connected successfully")

})
.catch((err)=>{
    console.log(err)
})

app.use("/api/auth",authRoutes)
app.use("/api/book",bookRoutes)

app.get("/",(req,res)=>{
    return res.json({"message":"running on port 5000"})})


app.listen(PORT,()=>console.log("Server started"))