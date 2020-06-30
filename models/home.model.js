const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/online-shop';



const productShcema = mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    descraption: String,
    image: String
})
const product = mongoose.model('product', productShcema); //made products collection with productSchema

exports.getProducts = () => {
   return new Promise ((resolve, reject) => {
     mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(err => {
       return product.find({})
     }).then(products => {
         mongoose.disconnect();
         resolve(products);

     }).catch(err => {
       mongoose.disconnect();
       reject(err)
      });
    

    })
    
}


exports.getProductsByCategory = (category) => {
  return new Promise ((resolve, reject) => {
    mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(err =>{
      return product.find({category : category})
    }).then(products => {
      mongoose.disconnect();
      resolve(products)

    }).catch(err => { 
      mongoose.disconnect();
      reject(err) });

  })


}










    