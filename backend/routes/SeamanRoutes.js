import express from 'express';
import {
  createSeamanDoc,
  getAllSeamanDocs,
  getSeamanDocById,
  updateSeamanDoc,
  deleteSeamanDoc
} from '../controllers/seamanDoc.Controller.js';
import { upload } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Routes with file upload middleware
router.post('/', upload.single('file'), createSeamanDoc);
router.put('/:id', upload.single('file'), updateSeamanDoc);

// Routes without file upload
router.get('/', getAllSeamanDocs);
router.get('/:id', getSeamanDocById);
router.delete('/:id', deleteSeamanDoc);

export default router;