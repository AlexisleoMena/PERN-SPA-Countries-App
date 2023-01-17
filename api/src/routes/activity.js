const { Router } = require("express");
const { addActivity, getNameActivities } = require("../controllers/activityController");

const router = Router();

router.get("/", getNameActivities)
/*
  {
    "name": "surfing",
    "difficulty": 2,
    "duration": 2,
    "season": "Autumn",
    "countries": ["Argentina"]
  }
*/
//http://localhost:3001/tourism
router.post( "/", addActivity)


module.exports = router;