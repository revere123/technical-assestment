var express = require('express');
var router = express.Router();
const person = require('../controllers/person.controller')

router.post('/add-person', person.PersonRegistration);
router.get('/search', person.AdvanceSearch);

module.exports = router;