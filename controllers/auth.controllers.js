const authoModel = require('../models/auth.model');

const validationResult = require('express-validator').validationResult;// to display the vali



exports.getSignUpPage = (req, res, next) => {
    res.render('sign-up.ejs',
    {
        error: req.flash("validError"),
        errorS: req.flash("errSignUp"),
        isAuth:req.session.nameId
    });
}
 
exports.createAccount = (req, res, next) => {
   // return console.log(validationResult(req).errors);// or validationResult(req).array
      
if (validationResult(req).isEmpty()) {

let password = req.body.password;
let userName = req.body.userName;
let email = req.body.email;

  authoModel.createAccount(email, userName, password).then(() => {
      res.redirect('/log-in');
  }).catch(err => {
      console.log(err);
      req.flash("errSignUp", err);
      res.redirect('sign-up');
  })
} else {
    req.flash("validError", validationResult(req).array())
    res.redirect('/sign-up');
}}




// get log-in page 
exports.getLogInPage = (req, res, next) => {
    
    res.render('log-in.ejs', {
        authError: req.flash('errorAuth')[0],
        isAuth:req.session.nameId
    });
}

//to make  middleWare to log-in in the page 
exports.logIn = (req, res, next) => {
authoModel.logInToPage(req.body.email, req.body.password).then(id => {
    req.session.nameId = id;// you can't make req.session.id
    res.redirect('/');
}).catch(err => {
    req.flash('errorAuth', err);
    res.redirect('/log-in');
})
}
exports.logout = (req, res, next) => {
    req.session.destroy( () => {
        res.redirect('/');

    })  

}
