const authorize = (req,res,next)=>{
    const {user}=req.query;
     if(user==='root'){
        req.user = {name:'root',id:3}
        next()
    }
    else{
        res.status(401).send("Unauthroized")
    }
}

module.exports = authorize;