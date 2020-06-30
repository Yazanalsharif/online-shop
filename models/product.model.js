const mongoose = require('mongoose');


const DB_URL = 'mongodb://localhost:27017/online-shop';

const productSchema = mongoose.Schema({
    name:String,
    price:Number,
    category:String,
    descraption:String,
    image:String
})

const product = mongoose.model('products', productSchema);

exports.getProductById = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, {useNewUrlParser:true, useUnifiedTopology:true}).then(err => {
           return product.findById(id);
        }).then(product => {
            mongoose.disconnect();
            resolve(product);
        }).then(err => {
            reject(err);
            mongoose.disconnect();

        });
    })

}
// to get the first product in dataBase 
exports.getFirstProduct = () => {
    return new Promise ((resolve, reject) => {
        mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology:true}).then(err => {
            return product.findOne({}).then(product => {
                mongoose.disconnect();
                resolve(product);
            }).catch(err => {
                mongoose.disconnect();
                reject(err)
            });
        })
    })
}