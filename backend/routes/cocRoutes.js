import express from 'express';
import {
  createCOC,
  searchCOC,
  getCOCById,
  updateCOC,
  deleteCOC
} from '../controllers/coc.Controller.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Example route for /api/coc
// router.get('/', (req, res) => {
//   res.json({ message: 'Coc API is working' });
// });

// Search COC records
router.get('/search', searchCOC);

// Get, update, and delete a COC record by ID
router.route('/:id')
  .get(getCOCById)
  .put(upload.single('file'), updateCOC)
  .delete(deleteCOC);

export default router;