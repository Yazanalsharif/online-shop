exports.isAuth = (req, res, next) => {
    if(req.session.nameId)
     next()
     else
     res.redirect('/log-in');
}

exports.notAuth = (req, res, next) => {
    if (!req.session.nameId)
    next();
    else
    res.redirect('/');
}