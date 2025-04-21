import SeamanDoc from '../models/seamanDocModel.js';
import { uploadFile } from '../utils/fileUpload.js';

// Create a new Seaman Document
export const createSeamanDoc = async (req, res) => {
  try {
    let fileData = {};

    if (req.file) {
      // Upload file to cloud storage
      const uploadResult = await uploadFile(req.file);
      fileData = {
        fileUrl: uploadResult.url,
        fileName: req.file.originalname
      };
    }

    const seamanData = {
      ...req.body,
      ...fileData
    };

    // Convert string dates to Date objects
    if (seamanData.expiryDate) seamanData.expiryDate = new Date(seamanData.expiryDate);

    const newSeamanDoc = new SeamanDoc(seamanData);
    const savedSeamanDoc = await newSeamanDoc.save();

    res.status(201).json({
      success: true,
      data: savedSeamanDoc
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all Seaman Documents
export const getAllSeamanDocs = async (req, res) => {
  try {
    const seamanDocs = await SeamanDoc.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: seamanDocs.length,
      data: seamanDocs
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get a single Seaman Document by ID
export const getSeamanDocById = async (req, res) => {
  try {
    const seamanDoc = await SeamanDoc.findById(req.params.id);

    if (!seamanDoc) {
      return res.status(404).json({
        success: false,
        message: 'Seaman Document not found'
      });
    }

    res.status(200).json({
      success: true,
      data: seamanDoc
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update a Seaman Document
export const updateSeamanDoc = async (req, res) => {
  try {
    let updateData = { ...req.body };

    // Handle file upload if there's a new file
    if (req.file) {
      const uploadResult = await uploadFile(req.file);
      updateData.fileUrl = uploadResult.url;
      updateData.fileName = req.file.originalname;
    }

    // Convert string dates to Date objects
    if (updateData.expiryDate) updateData.expiryDate = new Date(updateData.expiryDate);

    const seamanDoc = await SeamanDoc.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!seamanDoc) {
      return res.status(404).json({
        success: false,
        message: 'Seaman Document not found'
      });
    }

    res.status(200).json({
      success: true,
      data: seamanDoc
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete a Seaman Document
export const deleteSeamanDoc = async (req, res) => {
  try {
    const seamanDoc = await SeamanDoc.findByIdAndDelete(req.params.id);

    if (!seamanDoc) {
      return res.status(404).json({
        success: false,
        message: 'Seaman Document not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Seaman Document deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};