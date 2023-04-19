/*
PRO		PR202011122
WO		WO202011122
EST		ES202011121
STAFF		ST202011121
PROMO		PM202011121
VENDOR		VD202011121
INVENTORY	IN202011121
CUSTOMER	CU202011121
JOB		JB202011121
PRICEBOOK	PB202011121
LOCATIONS	LO202011121
PURCHASE_ORDERS	PO202011121
EQUIPMENT	EQ202011121
*/

const db = require("../models");
const systemConstants = require('../helpers/constants')
const _ = require('lodash');
const AutoIncrementId = db.autoIncrementor;

const generateID = async (type) => {
    return new Promise((resolve, reject) => {
        try {
            AutoIncrementId.findOneAndUpdate(
                { type: systemConstants.SEQUENCE_CODE },
                { $inc: { [type]: 1 } },
                { upsert: true },
            ).then((sequence) => {
                if (sequence) {

                    let system = _.findKey(systemConstants, _.partial(_.isEqual, type));

                    resolve(`${systemConstants[system]}${systemConstants.CURRENT_DATE}` + (parseInt(sequence[type] + 1)))
                } else {
                    reject(sequence)
                }
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = { generateID }