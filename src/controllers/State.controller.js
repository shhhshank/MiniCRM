// stateController.js
const State = require("../models/State.schema");

exports.addState = async (stateData) => {
  const state = new State(stateData);
  await state.save();
};

exports.getStates = async () => {
  return await State.find();
};

exports.getStateById = async (id) => {
  return await State.findById(id);
};

exports.updateState = async (id, stateData) => {
  return await State.findByIdAndUpdate(id, stateData, { new: true });
};

exports.deleteState = async (id) => {
  return await State.findByIdAndDelete(id);
};
