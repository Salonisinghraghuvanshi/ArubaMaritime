import express from 'express';
import {
  createVessel,
  getAllVessels,
  getVesselById,
  updateVessel,
  deleteVessel
} from '../controllers/vessel.Controller.js';

const router = express.Router();

router.post('/', createVessel);
router.get('/', getAllVessels);
router.get('/:id', getVesselById);
router.put('/:id', updateVessel);
router.delete('/:id', deleteVessel);

export default router;