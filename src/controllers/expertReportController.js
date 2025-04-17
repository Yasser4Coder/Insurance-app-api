import ExpertReport from "../models/ExpertReport.js";

export const createExpertReport = async (req, res) => {
  const {
    claim,
    expert,
    inspectionDate,
    damageDescription,
    estimatedCost,
    images,
  } = req.body;

  try {
    const expertReport = await ExpertReport.create({
      claim,
      expert,
      inspectionDate,
      damageDescription,
      estimatedCost,
      images,
    });

    res
      .status(201)
      .json({ message: "Expert report created successfully", expertReport });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create expert report",
      error: error.message,
    });
  }
};

export const getExpertReport = async (req, res) => {
  const { id } = req.params;

  try {
    const expertReport = await ExpertReport.findById(id)
      .populate("claim")
      .populate("expert");

    if (!expertReport) {
      return res.status(404).json({ message: "Expert report not found" });
    }

    res
      .status(200)
      .json({ message: "Expert report retrieved successfully", expertReport });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve expert report",
      error: error.message,
    });
  }
};

export const updateExpertReport = async (req, res) => {
  const { id } = req.params;
  const {
    claim,
    expert,
    inspectionDate,
    damageDescription,
    estimatedCost,
    images,
  } = req.body;

  try {
    const updatedExpertReport = await ExpertReport.findByIdAndUpdate(
      id,
      {
        claim,
        expert,
        inspectionDate,
        damageDescription,
        estimatedCost,
        images,
      },
      { new: true, runValidators: true }
    );

    if (!updatedExpertReport) {
      return res.status(404).json({ message: "Expert report not found" });
    }

    res.status(200).json({
      message: "Expert report updated successfully",
      expertReport: updatedExpertReport,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update expert report",
      error: error.message,
    });
  }
};

export const deleteExpertReport = async (req, res) => {
  const { id } = req.params;

  try {
    const expertReport = await ExpertReport.findByIdAndDelete(id);

    if (!expertReport) {
      return res.status(404).json({ message: "Expert report not found" });
    }

    res.status(200).json({ message: "Expert report deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete expert report",
      error: error.message,
    });
  }
};

export const getAllExpertReports = async (req, res) => {
  try {
    const expertReports = await ExpertReport.find()
      .populate("claim")
      .populate("expert");

    res.status(200).json({
      message: "All expert reports retrieved successfully",
      expertReports,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve all expert reports",
      error: error.message,
    });
  }
};

export const getExpertReportsByClaim = async (req, res) => {
  const { claimId } = req.params;

  try {
    const expertReports = await ExpertReport.find({ claim: claimId }).populate(
      "expert"
    );

    res.status(200).json({
      message: "Expert reports for claim retrieved successfully",
      expertReports,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve expert reports for claim",
      error: error.message,
    });
  }
};

export const getExpertReportsByExpert = async (req, res) => {
  const { expertId } = req.params;

  try {
    const expertReports = await ExpertReport.find({
      expert: expertId,
    }).populate("claim");

    res.status(200).json({
      message: "Expert reports by expert retrieved successfully",
      expertReports,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve expert reports by expert",
      error: error.message,
    });
  }
};
