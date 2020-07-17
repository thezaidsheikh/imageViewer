const jwt = require('jsonwebtoken');

// This middleware is to check the user authentication.

exports.checkApiToken = (req, res, next) => {
    try{
        var token = req.headers.authorization;
        var userId = req.headers.userid;
    
        if (token == undefined || token == null || token == '') {
            res.status(504).json({status:504, msg: "You do not have access to this API" });
        }
        else {
            jwt.verify(token, 'secret', (err, decode) => {
                
                if (err) res.json({status:504, msg: "you are not valid user" });
                else if(userId == decode.result._id){
                    req.userId = userId;
                    next();
                }
                else res.status(400).json({status:400 , msg:"you do not have access to this API , wrong user"})
                
            })
        }
    }
    catch(e){
        res.status(400).json({status:400 , msg:e})
    }
    
}