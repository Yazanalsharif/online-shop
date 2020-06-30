
const productById = require('../models/product.model');



exports.getProductPage = (req, res, next) => {
 //get id 
 //get product 
 //render ejs
 let id = req.params.id;
 productById.getProductById(id).then(product => {
     res.render('product.ejs', {
         product:product
     });
 })


}
/*
//to redirect to the home when open product 
exports.getNoneProduct = (req, res, next) => {
  res.redirect('/');
}
*/


exports.getNoneProduct = (req, res, next) => {
    // getFirst product 
    // render ejs 
    productById.getFirstProduct().then(product => {
        res.render('product.ejs', {
            product:product
        })
    })
}


