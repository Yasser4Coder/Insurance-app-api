import Vehicle from "../models/Vehicle.js";

const addVehicle = async (req, res) => {
  try {
    const {
      owner,
      registrationNumber,
      model,
      brand,
      year,
      chassisNumber,
      driveLicense,
      vehicleRegistration,
    } = req.body;

    // The driveLicense and vehicleRegistration will already be in Base64 format
    const vehicle = new Vehicle({
      owner,
      registrationNumber,
      model,
      brand,
      year,
      chassisNumber,
      driveLicense,
      vehicleRegistration,
    });

    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    await Vehicle.findByIdAndDelete(id);
    res.status(200).json({ message: "Vehicle removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findById(id);
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const { owner, registrationNumber, model, brand, year, chassisNumber } =
      req.body;

    const vehicle = await Vehicle.findByIdAndUpdate(
      id,
      { owner, registrationNumber, model, brand, year, chassisNumber },
      { new: true }
    );
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserVehicles = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicles = await Vehicle.find({ owner: id });
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export {
  addVehicle,
  removeVehicle,
  getVehicle,
  updateVehicle,
  getAllVehicles,
  getUserVehicles,
};
