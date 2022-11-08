const express = require("express");
const router = express.Router();

// require the Drone model here
const Drone = require("../models/Drone.model");

router.get("/drones", async (req, res, next) => {
  try {
    const allDrones = await Drone.find();
    res.render("drones/list", { allDrones });
  } catch (error) {
    console.log(error);
  }
});

router.get("/drones/create", (req, res, next) => {
  res.render("drones/create-form");
});

router.post("/drones/create", async (req, res, next) => {
  try {
    const { name, propellers, maxSpeed } = req.body;
    await Drone.create({ name, propellers, maxSpeed });
    res.redirect("/drones");
  } catch (error) {
    console.log(error);
    res.render("drones/create-form");
  }
});

router.get("/drones/:id/edit", async (req, res, next) => {
  const droneToEdit = await Drone.findById(req.params.id);
  res.render("drones/update-form", { droneToEdit });
});

router.post("/drones/:id/edit", async (req, res, next) => {
  try {
    const { name, propellers, maxSpeed } = req.body;
    await Drone.findByIdAndUpdate(req.params.id, { name, propellers, maxSpeed });
    res.redirect("/drones");
  } catch (error) {
    console.log(error);
    res.render("drones/update-form");
  }
});

router.post("/drones/:id/delete", async (req, res, next) => {
  try {
    await Drone.findByIdAndDelete(req.params.id);
    res.redirect("/drones");
  } catch (error) {
    console.log(error);
    res.redirect("/drones");
  }
});

module.exports = router;
