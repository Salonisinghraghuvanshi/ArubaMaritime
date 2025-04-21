import Vessel from '../models/vesselModel.js';

// Create a new Vessel
export const createVessel = async (req, res) => {
  try {
    const vesselData = { ...req.body };

    // Convert string dates to Date objects
    if (vesselData.dateOfIssue) vesselData.dateOfIssue = new Date(vesselData.dateOfIssue);
    if (vesselData.validTill) vesselData.validTill = new Date(vesselData.validTill);

    const newVessel = new Vessel(vesselData);
    const savedVessel = await newVessel.save();

    res.status(201).json({
      success: true,
      data: savedVessel
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all Vessels
export const getAllVessels = async (req, res) => {
  try {
    const vessels = await Vessel.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: vessels.length,
      data: vessels
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get a single Vessel by ID
export const getVesselById = async (req, res) => {
  try {
    const vessel = await Vessel.findById(req.params.id);

    if (!vessel) {
      return res.status(404).json({
        success: false,
        message: 'Vessel not found'
      });
    }

    res.status(200).json({
      success: true,
      data: vessel
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update a Vessel
export const updateVessel = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Convert string dates to Date objects
    if (updateData.dateOfIssue) updateData.dateOfIssue = new Date(updateData.dateOfIssue);
    if (updateData.validTill) updateData.validTill = new Date(updateData.validTill);

    const vessel = await Vessel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!vessel) {
      return res.status(404).json({
        success: false,
        message: 'Vessel not found'
      });
    }

    res.status(200).json({
      success: true,
      data: vessel
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete a Vessel
export const deleteVessel = async (req, res) => {
  try {
    const vessel = await Vessel.findByIdAndDelete(req.params.id);

    if (!vessel) {
      return res.status(404).json({
        success: false,
        message: 'Vessel not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Vessel deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};