const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    var reqToken ="";
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        reqToken =  req.headers.authorization.split(' ')[1]
    }
    jwt.verify(reqToken,process.env.TOKEN_SECRET,(err,result)=>{
        if(err){
            res.sendStatus(403);
        }else{
            next();
        }
    });
}

module.exports = verifyToken;
