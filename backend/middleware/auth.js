const jwt = require('jsonwebtoken');

const requiredAuth = (req , res , next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(400).json({message : "token not found"});
    }
    const token = authHeader.startsWith('Bearer')?authHeader.split(' ')[1]:authHeader;
    if(token){
        jwt.verify(token , process.env.JWT_SECRET_KEY , (err , decodedId) =>{
            if(err){
                return res.status(401).json({message : 'Invalid token'});
            }
            else{
                req.userId = decodedId.id;
                next();
            }
        });
    }else{
        res.status(401).json({message : 'no token provided'});
    }
}

module.exports = requiredAuth;