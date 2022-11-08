require("./../db/index");
const { default: mongoose } = require("mongoose");
const Drones = require("./../models/Drone.model");
const drones = [
  { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
  { name: "Racer 57", propellers: 4, maxSpeed: 20 },
  { name: "Courier 3000i", propellers: 6, maxSpeed: 18 },
];

try {
  seed();
} catch (error) {
  console.log(error);
}

async function seed() {
  const allDrones = await Drones.create(drones);
  mongoose.connection.close();
  console.log(`Created ${allDrones.length} drones`);
}
