var jwt = require("jsonwebtoken");
var apiResponse = require("../helpers/apiResponses");
const verifyJWT = (req, res, next) => {
    try {
        jwt.verify(req.headers.authorization, process.env.JWT_SECRET, (err, verify) => {
            if (err) {
                return apiResponse.unauthorizedResponse(res, err);
            } else {
                next();
            }
        })
    } catch (e) {
        return apiResponse.ErrorResponse(res, e);
    }
}

module.exports = verifyJWT