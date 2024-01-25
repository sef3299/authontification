const jwt=require('jsonwebtoken')
const users=require('../model/Model')
exports.isauth=async(req,res,next)=>{
    const token=req.header('token');
    try {
        const secretkey="azerty"
        const verify=jwt.verify(token,secretkey);
        if(verify){
            res.status(400).send({msg:'your are not authorized'})
        }
        const user=await users.findById(verify.id)
        req.user=user
        next()
    } catch (error) {
        res.status(5000).send({msg:'invalid token',error})
        
    }
}