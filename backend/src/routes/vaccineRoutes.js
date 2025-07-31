import express from 'express';
import { createVaccine, getAllVaccines, getVaccine, updateVaccine, deleteVaccine } from '../controllers/vaccineController.js';

const vaccineRouter = express.Router();

// POST /api/vaccines/create
vaccineRouter.post('/create', createVaccine);
vaccineRouter.get('/allvaccines', getAllVaccines);
vaccineRouter.get('/:vaccineid', getVaccine);
vaccineRouter.put('/update-vaccine/:vaccineid', updateVaccine);
vaccineRouter.delete('/delete-vaccine/:vaccineid', deleteVaccine);

export default vaccineRouter;
