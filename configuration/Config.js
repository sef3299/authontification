const mongoose=require ("mongoose")
const connectdb=async()=>{
    try {await mongoose.connect("mongodb+srv://seifabichou20:OBB9N47b7E9iShk3@cluster0.tyryzzc.mongodb.net/?retryWrites=true&w=majority")
        console.log("database is connected")
    } catch (error) {
        console.log("data base is not connected",error)
    }
}
module.exports=connectdb