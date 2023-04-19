const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.person = require("./person.model")(mongoose);
db.personAddresses = require("./person_addresses.model")(mongoose);
module.exports = db