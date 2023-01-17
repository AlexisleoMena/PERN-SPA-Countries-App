const { Country, Activity } = require("../db.js");
const { Sequelize } = require("sequelize");

const addActivity = async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;
  console.log("BODY", req.body)
  try {
    const [activity, created] = await Activity.findOrCreate({
      where: { name, difficulty, duration, season },
    });
    console.log("Activity", JSON.stringify(activity))
    let countriesSearched = await Country.findAll({
      where: { name: countries },
    });
    console.log("CountriesSearched", JSON.stringify(countriesSearched))

    if (countriesSearched.length) {
      await activity.addCountry(countriesSearched);
      return res.send({ Added: true });
    }
    res
      .status(404)
      .send({ Added: false, msg: "Country names not found." });
  } catch (error) {
    res
      .status(400)
      .send({ Added: false, msg: error.message });
  }
};

const getNameActivities = async (req, res) => {
  try {
    let names = await Activity.findAll({
      attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("name")), "name"]],
      order: [['name', 'ASC']]
    });

    res.send(names.map(({ name }) => name));
  } catch (error) {
    res.status(400).send("There was an error processing your request.");
  }
};

module.exports = {
  addActivity,
  getNameActivities,
};
