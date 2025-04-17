import Claim from "../models/Claim.js";

export const addClaim = async (req, res) => {
  try {
    const { vehicleId, policyId, userId, description, date } = req.body;
    const claim = new Claim({
      userId,
      vehicleId,
      policyId,
      description,
      date,
    });
    await claim.save();
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
