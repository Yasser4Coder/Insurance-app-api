import Claim from "../models/Claim.js";
import Vehicle from "../models/Vehicle.js";

export const addClaim = async (req, res) => {
  try {
    const {
      user,
      vehicle, // this should be the vehicle ID
      policy,
      description,
      date,
      location,
      wilaya,
      accidentType,
      VehicleStatus,
      images,
    } = req.body;

    // Create the claim document
    const claim = new Claim({
      user,
      vehicle,
      policy,
      description,
      date,
      location,
      wilaya,
      accidentType,
      VehicleStatus,
      images,
      status: "pending",
    });

    // Save the claim
    await claim.save();

    // Find the vehicle by ID and increment claims count by 1
    await Vehicle.findByIdAndUpdate(vehicle, { $inc: { claims: 1 } });

    res.status(201).json(claim);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeClaim = async (req, res) => {
  try {
    const { id } = req.params;
    await Claim.findByIdAndDelete(id);
    res.status(200).json({ message: "Claim removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getClaim = async (req, res) => {
  try {
    const { id } = req.params;
    const claim = await Claim.findById(id)
      .populate("user")
      .populate("vehicle")
      .populate("policy")
      .populate("expert");

    if (!claim) return res.status(404).json({ message: "Not found" });

    res.status(200).json(claim);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateClaim = async (req, res) => {
  try {
    const { id } = req.params;
    const { vehicle, policy, description, date, status, expert } = req.body;

    const updatedClaim = await Claim.findByIdAndUpdate(
      id,
      { vehicle, policy, description, date, status, expert },
      { new: true }
    );

    if (!updatedClaim)
      return res.status(404).json({ message: "Claim not found" });

    res.status(200).json(updatedClaim);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllClaims = async (req, res) => {
  try {
    const claims = await Claim.find()
      .populate("user")
      .populate("vehicle")
      .populate("policy")
      .populate("expert");

    res.status(200).json(claims);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserClaims = async (req, res) => {
  try {
    const { id } = req.params;
    const claims = await Claim.find({ user: id })
      .populate("vehicle")
      .populate("policy")
      .populate("expert", "name");

    res.status(200).json(claims);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const assignExpertToClaim = async (req, res) => {
  try {
    const { id } = req.params;
    const { expertId } = req.body;

    const claim = await Claim.findByIdAndUpdate(
      id,
      { expert: expertId, status: "in_review" },
      { new: true }
    );

    if (!claim) return res.status(404).json({ message: "Claim not found" });

    res.status(200).json(claim);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateClaimStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const claim = await Claim.findByIdAndUpdate(id, { status }, { new: true });

    if (!claim) return res.status(404).json({ message: "Claim not found" });

    res.status(200).json(claim);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createAssessment = async (req, res) => {
  const { photos, description, insurancePrice } = req.body;
  try {
    const updatedClaim = await Claim.findByIdAndUpdate(
      req.params.id,
      {
        status: "resolved",
        assessment: {
          photos,
          description,
          insurancePrice,
        },
      },
      { new: true }
    );
    res.json(updatedClaim);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
