const UserRegisterModel = require('../models/userRegister.model');
const userMiddleware = require('../middleware/encrypt_decrypt_pass');
const jwt = require('jsonwebtoken');


// this function will register the new user.

exports.register = (req, res) => {
    try {

        var email = req.body.email;
        var password = req.password;
        var userModelObj = new UserRegisterModel({
            email: email,
            password: password,
            phone: req.body.phone
        });
        console.log(userModelObj);

        userModelObj.save(userModelObj, (err, result) => {
            if (err) res.json({ msg: err });
            res.status(200).json({ status: 200, msg: "Successfully Registered" });
        })
    }
    catch (e) {
        res.json({ msg: e });
    }
}
// ------------------------------END of the function------------------------------


// this function will login the user.

exports.login = (req, res) => {
    try {
        var email = req.body.email;
        var password = req.body.password;
        if (((email == undefined) || (email == null) || (email == '')) || ((password == undefined) || (password == null) || (password == ''))) {
            res.json({ status: 404, msg: "all fields are required" });
        }
        else {
            var findUser = UserRegisterModel.find({ email: email }, (error, result) => {
                if (error) res.json({ status: 404, msg: err });
                else {
                    if (result.length > 0) {
                        userMiddleware.decryptPassword(password, result[0].password, (err, whatIsTheStatus) => {
                            if (err) res.json({ status: 404, msg: err });
                            if (whatIsTheStatus == true) {
                                jwt.sign({ result: result[0] }, 'secret', { expiresIn: "1h" }, (error, token) => {
                                    if (error) return res.status(404).json({ "statusCode": 404, "msg": error })
                                    console.log(token);
                                    res.status(200).json({ 'statusCode': 200, 'msg': 'Logged In successfully', 'token': token, data: result[0] });
                                })
                            }
                            else res.json({ status: 404, msg: 'please check your password' });
                        })
                    }
                    else res.json({ status: 404, msg: "Please register first" });
                }
            })
        }
    }
    catch (e) {
        res.json({ msg: e });
    }
}
// ------------------------------END of the function------------------------------