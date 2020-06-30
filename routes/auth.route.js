const route = require('express').Router();

const bodyParser = require('body-parser');// to get data from user

const check = require('express-validator').check;// to make process validator about data sign-up

const gard = require('../auth.gards/auth.gards');// know what is gards

const bodyParserMw = bodyParser.urlencoded({
    extended:true
})

const authController = require('../controllers/auth.controllers');

route.get('/sign-up', gard.notAuth, authController.getSignUpPage); // you have display why the user can't make account

route.post('/sign-up', bodyParserMw,
check("email").not().isEmpty().withMessage('the feild of email is empty')
.isEmail().withMessage("this is not email"),
check("userName").isLength({min: 3}).withMessage("the username must be greater the 3 letters"),
check("password").isLength({min:8}).withMessage("the password must be greater than 8 letters"),
check("confiremPassword").custom((value, {req}) => {
    if(value === req.body.password) 
    return true
    else
    throw "does't equals"
})
.withMessage("the password not equal with confirem password"),//you can make middle ware here or cutom validator#31

authController.createAccount);

route.get('/log-in', gard.notAuth, authController.getLogInPage);

route.post('/log-in', bodyParserMw, authController.logIn);

route.post('/log-out', authController.logout);



module.exports = route;

