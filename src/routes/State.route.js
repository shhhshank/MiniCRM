// stateRoutes.js
const express = require("express");
const stateController = require("../controllers/State.controller");
const stateSchema = require("../joi/State.schema");

const router = express.Router();

router.post("/states", (req, res) => {
  const { error, value } = stateSchema.validate(req.body);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  stateController
    .addState(value)
    .then(() => res.status(201).send({ message: "State added successfully" }))
    .catch((err) => res.status(500).send({ error: "Internal Server Error" }));
});

router.get("/states", (req, res) => {
  stateController
    .getStates()
    .then((states) => res.status(200).json(states))
    .catch((err) => res.status(500).send({ error: "Internal Server Error" }));
});

router.get("/states/:id", (req, res) => {
  stateController
    .getStateById(req.params.id)
    .then((state) => {
      if (!state) return res.status(404).send({ error: "State not found" });
      res.status(200).json(state);
    })
    .catch((err) => res.status(500).send({ error: "Internal Server Error" }));
});

router.put("/states/:id", (req, res) => {
  const { error, value } = stateSchema.validate(req.body);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  stateController
    .updateState(req.params.id, value)
    .then((state) => {
      if (!state) return res.status(404).send({ error: "State not found" });
      res.status(200).send({ message: "State updated successfully" });
    })
    .catch((err) => res.status(500).send({ error: "Internal Server Error" }));
});

router.delete("/states/:id", (req, res) => {
  stateController
    .deleteState(req.params.id)
    .then((state) => {
      if (!state) return res.status(404).send({ error: "State not found" });
      res.status(200).send({ message: "State deleted successfully" });
    })
    .catch((err) => res.status(500).send({ error: "Internal Server Error" }));
});

module.exports = router;
