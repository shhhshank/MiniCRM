// cityRoutes.js
const express = require("express");
const cityController = require("../controllers/City.controller");
const citySchema = require("../joi/City.schema");

const router = express.Router();

router.post("/cities", (req, res) => {
  const { error, value } = citySchema.validate(req.body);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  cityController
    .addCity(value)
    .then(() => res.status(201).send({ message: "City added successfully" }))
    .catch((err) => res.status(500).send({ error: "Internal Server Error" }));
});

router.get("/cities", (req, res) => {
  cityController
    .getCities()
    .then((cities) => res.status(200).json(cities))
    .catch((err) => res.status(500).send({ error: "Internal Server Error" }));
});

router.get("/cities/:id", (req, res) => {
  cityController
    .getCityById(req.params.id)
    .then((city) => {
      if (!city) return res.status(404).send({ error: "City not found" });
      res.status(200).json(city);
    })
    .catch((err) => res.status(500).send({ error: "Internal Server Error" }));
});

router.put("/cities/:id", (req, res) => {
  const { error, value } = citySchema.validate(req.body);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  cityController
    .updateCity(req.params.id, value)
    .then((city) => {
      if (!city) return res.status(404).send({ error: "City not found" });
      res.status(200).send({ message: "City updated successfully" });
    })
    .catch((err) => res.status(500).send({ error: "Internal Server Error" }));
});

router.delete("/cities/:id", (req, res) => {
  cityController
    .deleteCity(req.params.id)
    .then((city) => {
      if (!city) return res.status(404).send({ error: "City not found" });
      res.status(200).send({ message: "City deleted successfully" });
    })
    .catch((err) => res.status(500).send({ error: "Internal Server Error" }));
});

module.exports = router;
