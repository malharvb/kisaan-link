const Buyer = require('../models/buyer');
const Order = require('../models/order');
const Stock = require('../models/stock');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const stock = require('../models/stock');

//  Auth
exports.login = (req, res, next) => {
    let buyerContact = req.body.buyerContact;
    let buyerPass = req.body.buyerPass;

    if(!buyerContact || !buyerPass){
        res.status(400)
        throw new Error("Empty Email or Password");
    }

    Buyer.findOne({ buyerContact })
        .then( buyerCont => {
            if(!buyerCont){
                res.status(401);
                throw new Error("buyer contact not found");
            }
            bcrypt.compare(buyerPass, buyerCont.buyerPass)
            .then(compareVal=>{
                if ( ( compareVal )) {
                    accessToken = jwt.sign({
                        Buyer:{
                            buyerContact: buyerCont.buyerContact,
                            buyerName: buyerCont.buyerName
                        }
                    }, "kisaanLink",
                    {expiresIn: "1440m"}
                    );
                    res.status(200).json({type: "Buyer", accessToken});
                }
                else{
                    res.status(401);
                    throw new Error("Email or Password not matched")
                }
            })})
}

exports.signup = (req, res, next) => {
    let buyerName = req.body.buyerName;
    let buyerContact = req.body.buyerContact;
    let buyerLocation = req.body.buyerLocation;
    let buyerPass = req.body.buyerPass;

    if(!buyerName || !buyerContact || !buyerLocation || !buyerPass){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    Buyer.findOne({ buyerContact })
        .then(exists => {
            if (exists) {
                res.status(400);
                throw new Error("User already exists");
            }
        })   

    let hashedPass;

    bcrypt.hash(buyerPass, 10)
        .then((hashedPass) => {
            const buyer = new Buyer({ buyerName: buyerName, buyerContact: buyerContact, buyerLocation: buyerLocation, buyerPass: hashedPass });
            buyer
                .save()
                .then(() => {
                    res.status(202).json({ mess: "Sign up succesful" });
                })
                .catch((err) => { console.log(err) })
        })

}

exports.currentUser = (req, res, next) => {
    res.json(req.Buyer);
}

exports.order = (req, res, next) => {
    let buyerContact = req.Buyer.buyerContact;
    let orderTotalPrice = req.body.orderTotalPrice;
    let orderItems = req.body.orderItems;

    const order = new Order({ buyerContact: buyerContact, orderTotalPrice: orderTotalPrice, orderItems: orderItems});
            order
                .save()
                .then(() => {
                    res.status(202).json({ mess: "Order placed successfully" });
                })
                .catch((err) => { console.log(err) })
}

exports.displayProducts = (req, res, next) =>{
    Stock.find().limit(20)
    .then((stock)=> {res.status(200).json(stock)})
}

exports.displayType = (req, res, next) =>{
    Stock.find({produceCategory: req.params.type}).limit(20)
    .then((stock)=> {res.status(200).json(stock)})
}

exports.displayProduct = (req, res, next) =>{
    Stock.find({_id: req.params.id})
    .then((stock)=> {res.status(200).json(stock)})
}

