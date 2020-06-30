const express = require('express');// to require the express module

const app = express();

const path = require('path');//built-in // to make select path easy

const bodyParser = require('body-parser');//to take data from user

const bodyParserMw = bodyParser.urlencoded({
    extended: true
});

const session = require('express-session');//this return value and this value will pass it to session Store 

const SessionStore = require("connect-mongodb-session")(session);//return constructor to make store from this cons


const STORE = new SessionStore({
    uri:'mongodb://localhost:27017/online-shop',// put the mogodb url
    collection:"sessions" // to make collection with name sessions in online-shop
})

app.use(session({
    secret:"hello guys how i can make some secret hhhh i am jk but if you know this statment then you can hack my page",
    saveUninitialized:false,
    //defult cookie is close browser 
    /*cookie:{
        //maxAge take time with milli secound
        maxAge: Infinity, //to make log-in to the last day in this life
        expires: new Date()// take the date will log out when its come 
    }*/
    // store to make location where  i want to store my session 
    store: STORE,
    proxy:true,
    resave:true
}))

//module flash
const flash = require('connect-flash');// require connect-flash to display the error of auth


app.use(flash());// to use flash and it will be in request object

app.set('view engine', 'ejs');// ejs

app.set('views', 'views');//defult folder views

app.use(express.static(path.join(__dirname, 'assests')));//to search the files in folder assests

app.use(express.static(path.join(__dirname, 'img')));// to search the files in folder img 

const homeRouting = require('./routes/home.route');// require the file i made it 

app.use('/', homeRouting);

const authRoute = require('./routes/auth.route');
app.use('/', authRoute);

const productRouting = require('./routes/product.route');
app.use('/product',productRouting);





app.listen(3000, (err) => {
    console.log('server listen to port 3000');
})
