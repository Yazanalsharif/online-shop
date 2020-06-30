const routes = require('express').Router();

const productController = require('../controllers/product.controller');

routes.get('/', productController.getNoneProduct);//before /:id becouse /:id will checks first 

routes.get('/:id',productController.getProductPage);// put middleware here 
 

module.exports = routes;