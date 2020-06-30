const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/online-shop';


const bcrypt = require('bcrypt');// to encraption the password 

let userSchema = mongoose.Schema({
    email:String,
    name:String,
    password:String
});

let users = mongoose.model('user', userSchema);
//***************we use return to use hash promise and avoid multable then 
/*exports.createAccount = (email, name, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL,  {useNewUrlParser: true, useUnifiedTopology: true}).then(err => {
            return users.findOne({email: email})
        }).then(user => {
            if(user) {
                resolve('the email already exist');
                mongoose.disconnect();
            } else {
                return bcrypt.hash(password, 10);
            }
        }).then(hashPassword => {
            let newUser = new users({
                email:email,
                name:name,
                password:hashPassword
            })
           return  newUser.save();

        }).then(() => {
            resolve();
            mongoose.disconnect();
        }).catch(err => {
            reject(err);
            mongoose.disconnect();
        })

    })
}*/

exports.createAccount = (email, name, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(err => {
           users.findOne({
                email:email
            }).then(user => {
                if (user) {
                    mongoose.disconnect();
                    reject('your email already exist');
                    
                } else {
                      // the number of encraption defult 10
                      bcrypt.hash(password, 10).then(hashPassword => {
                        let newUser = new users ({
                            email:email,
                            name:name,
                            password:hashPassword
                        })
                         newUser.save().then(() => {
                            mongoose.disconnect();
                            resolve('success');
                           
                        }).catch(err => {
                            mongoose.disconnect();
                            console.log(err);
                            reject(err);
                        })
                    })
  
                }
            })
        })
    })
}
exports.logInToPage = (email, password) => {
    //check if the email exist 
    //check if the password correct 
    return new Promise ((resolve, reject) => {
        mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(err => {
            users.findOne({email: email}).then(user => {
                if(!user) {
                    mongoose.disconnect();
                    reject("your email does not exist");
                } else {
                    bcrypt.compare(password, user.password).then(same => {
                        if(!same){
                            mongoose.disconnect();
                            reject("your password incorrect");
                        } else {
                            //session : to make prossec that make time loging => cookies or local storge 
                            //cookies defult time when you close the browser will make log out 
                            //i need to install module connect-mongodb-session , express-session 
                            mongoose.disconnect();
                            resolve(user._id);
                        }
                    })      
                }
            })
        }).catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    })
   
}




















