const { Country, Activity } = require("../db.js");
const axios = require("axios");
const { Op } = require("sequelize");

const removeDiacritics = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const dataApiRequired = ( data ) => {
  return data.map( (country) => ({
    id: country.cca3,
    name: removeDiacritics(country.name.common),
    flagimg: country.flags[1],
    continents: country.continents[0],
    region: country.region,
    capital: country.capital ? country.capital[0] : 'Does not have',
    subregion: country.subregion ? country.subregion : 'Does not have', 
    area: country.area,
    population: country.population
  }));
}

const dataDbRequired = ( ({ dataValues }) => {
  const Activities = dataValues.Activity?.map( ({dataValues}) => ({
    id: dataValues.id,
    name: dataValues.name,
    difficulty: dataValues.difficulty,
    duration: dataValues.duration,
    season: dataValues.season
  }));

  return {
    id: dataValues.id,
    name: dataValues.name,
    flagimg: dataValues.flagimg,
    continents: dataValues.continents,
    region: dataValues.region,
    capital: dataValues.capital,
    subregion: dataValues.subregion, 
    area: dataValues.area,
    population: dataValues.population,
    Activities
  }
})


const getCountries = async ( req, res ) => {
  const { name } = req.query;
  try {
    let countriesInDb = await Country.findAll({ include: { model: Activity, as: "Activity" } });

    if( !countriesInDb.length ) {
      let { data } = await axios("https://restcountries.com/v3/all");
      await Country.bulkCreate( dataApiRequired(data)/* , { ignoreDuplicates: true } */ );
    }

    if( name !== undefined ) {
      if( !name.length ) return res.status(200).send([]);
      let nameTrimed = name.replace(/^\s+|\s+$/, "");
      if( !nameTrimed.length ) return res.status(200).send([]);
      const searched = await Country.findAll({
        where: { name: { [Op.iLike]: nameTrimed+"%" } },
        include: { model: Activity, as: "Activity" }
      });
      if( !searched.length ) {
        return res.status(200).send([]);
      }
      return res.send(searched.map(dataDbRequired));
    }

    countriesInDb = await Country.findAll({ include: { model: Activity, as: "Activity" } });
    res.send(countriesInDb.map(dataDbRequired));

  } catch (error) {
    res.status(400).send(error);
  }
}

const getCountryById = async (req, res) => {
  let id = req.params.id.toUpperCase();
  try {
    const searched = await Country.findByPk(id, { include: { model: Activity, as: "Activity" } });
    if( searched ){
      return res.send(dataDbRequired(searched));
    }
    res.status(404).send("Id not found");
  } catch (error) {
    res.status(400).send(error);
  }

}

module.exports = {
  getCountries,
  getCountryById

}