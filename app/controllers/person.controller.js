const db = require("../models");
const { v4: uuidv4 } = require('uuid');
const apiResponses = require('../helpers/apiResponses')
const Person = db.person;
const PersonAddresses = db.personAddresses;



//PRO REGISTRATION STARTS
exports.PersonRegistration = async (req, res) => {
    try {
        let personInsertion = await personDataInsertion(req)
        if (personInsertion) {
            return apiResponses.successResponseWithData(res, "Person Created Successfully.", personInsertion);
        } else {
            return apiResponses.errorResponse(res, error);
        }
    } catch (e) {
        return apiResponses.errorResponse(res, e);
    }
};


const personDataInsertion = async (req) => {
    console.log("🚀 ~ file: person.controller.js:110 ~ req:", req.body)
    let data = {
        'data': req.body.personId
    }
    return new Promise((resolve, reject) => {
        const person = new Person({
            personId: uuidv4(),
            gender:req.body.gender,
            dob:req.body.dob,
            name:{
                first:req.body.name.first,
                middle:req.body.name.middle,
                last:req.body.name.last,
                isAlive:req.body.name.isAlive
            },
            addresses: [
                {
                    from: req.body.addresses[0].from, // YYYY-MM-DD
                    to: req.body.addresses[0].to, // YYYY-MM-DD, will be empty for current address
                    status:req.body.addresses[0].status,
                    zipCodes:req.body.addresses[0].zipCodes,
                    addressId: uuidv4()
                }
            ]
         
        });
        person.save((error, personData) => {
            if (error) { reject(error) }
            resolve(personData)
        })
    })
};

exports.getPersonList = async (req, res) => {
    try {
        Person.find({}).sort({ createdAt: -1 }).limit(100).then((personlist) => {
            if (personlist) {
                return apiResponses.successResponseWithData(res, "Fetched Person list Successfully", personlist);
            } else {
                return apiResponses.notFoundResponse(res, "Person list Not Found");
            }
        })
    } catch (e) {
        return apiResponses.errorResponse(res, e);
    }
};



exports.AdvanceSearch = (req, res) => {
    console.log("🚀 ~ file: person.controller.js:107 ~ req:", req.query)
    const from = req.query.from;
    const to = req.query.to;
    const status = req.query.status;
    const zipCodes = req.query.zipCodes;
    var condition = {};
    if (from) {
        condition["addresses.from"] = { $regex: `.*${from}.*`, $options: "i" }
    }
    if (to) {
        condition["addresses.to"] = { $regex: `.*${to}.*`, $options: "i" }
    }
    if (status) {
        condition["addresses.status"] = { $regex: `.*${status}.*`, $options: "i" }
    }
    if (zipCodes) {
        condition["addresses.zipCodes"] = { $regex: `.*${zipCodes}.*`, $options: "i" }
    }
    Person.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving person."
            });
        });
};





