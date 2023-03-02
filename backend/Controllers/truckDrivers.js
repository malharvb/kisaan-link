const TruckDriver = require('../models/truckDriver');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//  Auth
exports.login = (req, res, next) => {
    let truckDriverContact = req.body.truckDriverContact;
    let truckDriverPass = req.body.truckDriverPass;
    if(!truckDriverContact || !truckDriverPass){
        res.status(400)
        throw new Error("Empty Email or Password");
    }

    TruckDriver.findOne({ truckDriverContact })
        .then( truckDriverCont => {
            if ( truckDriverCont && (bcrypt.compare(truckDriverPass, TruckDriver.truckDriverPass)) ) {
                accessToken = jwt.sign({
                    TruckDriver:{
                        truckDriverContact: TruckDriver.truckDriverContact,
                        truckDriverName: TruckDriver.truckDriverName
                    }
                }, "kisaanLink",
                {expiresIn: "1440"}
                );
                res.status(200).json(accessToken);
            }
            else{
                res.status(401);
                throw new Error("Email or Password not matched")
            }
        })    
}

exports.signup = (req, res, next) => {
    let truckDriverName = req.body.truckDriverName;
    let truckDriverContact = req.body.truckDriverContact;
    let truckDriverLocation = req.body.truckDriverLocation;
    let truckDriverPass = req.body.truckDriverPass;

    if ( !truckDriverName ||  !truckDriverContact ||  !truckDriverLocation ||  !truckDriverPass) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    TruckDriver.findOne({ truckDriverContact })
        .then(exists => {
            if (exists) {
                res.status(400);
                throw new Error("User already exists");
            }
        })

    let hashedPass;

    bcrypt.hash(truckDriverPass, 10)
        .then((hashedPass) => {
            const truckDriver = new truckDriver({ truckDriverName: truckDriverName, truckDriverContact: truckDriverContact, truckDriverLocation: truckDriverLocation, truckDriverPass: hashedPass });
         truckDriver
                .save()
                .then(() => {
                    res.json({ mess: "Sign up succesful" })
                    res.status(202);
                })
                .catch((err) => { console.log(err) })
        })

}

exports.currentUser = (req, res, next) => {

    res.status(202);
    res.json({ mess: "Current user is identified" });
}

//Functions