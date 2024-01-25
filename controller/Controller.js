const users=require("../model/Model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
exports.register=async(req,res)=>{
    const {name,email,password}=req.body
    try {const user =await users.findOne({email})
    if (user){
        res.status(400).send({msg:"user is exist"})
    }
    else {
        const newuser=new users(req.body)
        const salt=10
        const hashpassword=bcrypt.hashSync(password,salt)
        newuser.password=hashpassword
        const secretkey="azerty"
        const token=jwt.sign({id:newuser._id},secretkey)
        await newuser.save()
        res.status(200).send({msg:"registration completed",newuser,token})
    }  
    } catch (error) {
        res.status(500).send({msg:"registration failed",error})
        
    }
    
}
exports.login=async(req,res)=>{
    const {email,password}=req.body
    try {const user=await users.findOne({email})
    if(!user){
        res.status(400).send({msg:"email not found you need to register"})

    }
    else{
        const compare=bcrypt.compareSync(password,user.password)
        if (!compare){
            res.status(400).send({msg:"wrong password"})
        }else{
            const secretkey="azerty"
        const token=jwt.sign({id:user._id},secretkey)
        res.status(200).send({msg:"login succ",user,token})
        }
    }

        
    } catch (error) {

        res.status(500).send({msg:"login failed",error})
    }
}
exports.getcurrent=(req,res)=>{
    res.status(200).send({user:req.user})
}