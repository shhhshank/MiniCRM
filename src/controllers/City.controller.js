// cityController.js
const City = require("../models/City.schema");

exports.addCity = async (cityData) => {
  const city = new City(cityData);
  await city.save();
};

exports.getCities = async () => {
  return await City.find().populate("state");
};

exports.getCityById = async (id) => {
  return await City.findById(id).populate("state");
};

exports.updateCity = async (id, cityData) => {
  return await City.findByIdAndUpdate(id, cityData, { new: true });
};

exports.deleteCity = async (id) => {
  return await City.findByIdAndDelete(id);
};
