// this files to create middleWare 
const takeProducts = require('../models/home.model');

exports.getHome = (req, res, next) => {
   
   
    //if catogyres && catogyres !== all 
    //statment 
    //else 
    // statment 
    //catogyresValue = ['']
    let category = req.query.category; //  category in req.query.category is name of <select></select> in ejs 
    // you have know this condition 
    if(category && category !== "all") { // category && to display all product when query prameter not difined
            takeProducts.getProductsByCategory(category).then(products => {
            res.render('index.ejs', {
                products : products,
                category:category,
                isAuth:req.session.nameId
               
            })
        }) } else {   
            // here the home page without filter
        takeProducts.getProducts(category).then(products => {
          
                //render index.ejs 
               res.render('index.ejs', {
                   products:products,
                   category:category,
                   isAuth:req.session.nameId
               })
           })
    }
   
   
   
 
   }