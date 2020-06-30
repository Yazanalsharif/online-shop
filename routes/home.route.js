// this file to routing home 
const routes = require('express').Router();
//to require middleware which i made it in home.controller
const homeController = require('../controllers/home.controller');

const gard = require('../auth.gards/auth.gards');

routes.get('/', homeController.getHome);

module.exports = routes;