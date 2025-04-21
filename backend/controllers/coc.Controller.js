import asyncHandler from 'express-async-handler';
import COC from '../models/cocModel.js';

// @desc    Create a new COC record
// @route   POST /api/coc
// @access  Public
export const createCOC = asyncHandler(async (req, res) => {
  const {
    certificateNumber,
    name,
    dateOfBirth,
    nationality,
    rank,
    course,
    regulation,
    seamanBook,
    flag,
    issueDate,
    expiryDate,
    status
  } = req.body;

  if (!name) {
    res.status(400);
    throw new Error('Name is required');
  }

  if (certificateNumber) {
    const existingCertificate = await COC.findOne({ certificateNumber });
    if (existingCertificate) {
      res.status(400);
      throw new Error('Certificate with this number already exists');
    }
  }

  const cocData = {
    certificateNumber,
    name,
    dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
    nationality,
    rank,
    course,
    regulation,
    seamanBook,
    flag,
    issueDate: issueDate ? new Date(issueDate) : null,
    expiryDate: expiryDate ? new Date(expiryDate) : null,
    status
  };

  if (req.file) {
    cocData.fileUrl = `/uploads/${req.file.filename}`;
    cocData.fileName = req.file.originalname;
  }

  const coc = await COC.create(cocData);

  res.status(201).json({ message: 'Certificate created successfully', data: coc });
});

// @desc    Search COC records
// @route   GET /api/coc/search
// @access  Public
export const searchCOC = asyncHandler(async (req, res) => {
  const { query } = req.query;

  if (!query) {
    res.status(400);
    throw new Error('Search query is required');
  }

  const textSearchResults = await COC.find(
    { $text: { $search: query } },
    { score: { $meta: "textScore" } }
  ).sort({ score: { $meta: "textScore" } }).limit(20);

  if (textSearchResults.length > 0) {
    return res.json({ message: 'Search results found', data: textSearchResults });
  }

  const regexQuery = new RegExp(query, 'i');
  const regexSearchResults = await COC.find({
    $or: [
      { certificateNumber: regexQuery },
      { name: regexQuery },
      { rank: regexQuery },
      { nationality: regexQuery },
      { seamanBook: regexQuery }
    ]
  }).limit(20);

  res.json({ message: 'Search results found', data: regexSearchResults });
});

// @desc    Get a COC record by ID
// @route   GET /api/coc/:id
// @access  Public
export const getCOCById = asyncHandler(async (req, res) => {
  const coc = await COC.findById(req.params.id);

  if (coc) {
    res.json({ message: 'Certificate retrieved successfully', data: coc });
  } else {
    res.status(404);
    throw new Error('Certificate not found');
  }
});

// @desc    Update a COC record
// @route   PUT /api/coc/:id
// @access  Public
export const updateCOC = asyncHandler(async (req, res) => {
  const coc = await COC.findById(req.params.id);

  if (!coc) {
    res.status(404);
    throw new Error('Certificate not found');
  }

  const {
    certificateNumber,
    name,
    dateOfBirth,
    nationality,
    rank,
    course,
    regulation,
    seamanBook,
    flag,
    issueDate,
    expiryDate,
    status
  } = req.body;

  if (!name) {
    res.status(400);
    throw new Error('Name is required');
  }

  coc.certificateNumber = certificateNumber || coc.certificateNumber;
  coc.name = name;
  coc.dateOfBirth = dateOfBirth ? new Date(dateOfBirth) : coc.dateOfBirth;
  coc.nationality = nationality || coc.nationality;
  coc.rank = rank || coc.rank;
  coc.course = course || coc.course;
  coc.regulation = regulation || coc.regulation;
  coc.seamanBook = seamanBook || coc.seamanBook;
  coc.flag = flag || coc.flag;
  coc.issueDate = issueDate ? new Date(issueDate) : coc.issueDate;
  coc.expiryDate = expiryDate ? new Date(expiryDate) : coc.expiryDate;
  coc.status = status || coc.status;

  if (req.file) {
    coc.fileUrl = `/uploads/${req.file.filename}`;
    coc.fileName = req.file.originalname;
  }

  const updatedCOC = await coc.save();

  res.json({ message: 'Certificate updated successfully', data: updatedCOC });
});

// @desc    Delete a COC record
// @route   DELETE /api/coc/:id
// @access  Public
export const deleteCOC = asyncHandler(async (req, res) => {
  const coc = await COC.findById(req.params.id);

  if (!coc) {
    res.status(404);
    throw new Error('Certificate not found');
  }

  await coc.deleteOne();

  res.json({ message: 'Certificate removed successfully' });
});
