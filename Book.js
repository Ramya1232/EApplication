const mongoose=require("mongoose")
const BookSchema=new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true
        },
        title:{
            type:String,
            required:true
        },
        author:{
            type:String,
            required:true
        },
        price:{
            type:String,
            required:true
        },
        imageUrl:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        }

    }
)
module.exports=mongoose.model("Book",BookSchema)