const { Router } = require("express");
const { getCountries, getCountryById } = require("../controllers/countryController");

const router = Router();

http://localhost:3001/countries or http://localhost:3001/countries?name=NAME
router.get( "/", getCountries)

http://localhost:3001/countries/:id
router.get( "/:id", getCountryById)

module.exports = router;