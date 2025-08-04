import express from 'express';
import { createVaccinationRecord, getAllVaccinationRecords, getVaccinationRecordById, deleteVaccinationRecord } from '../controllers/userVaccinationController.js';
const userVaccinationRouter = express.Router();

userVaccinationRouter.post('/dispense-vaccine', createVaccinationRecord);
userVaccinationRouter.get('/all-vaccination-records', getAllVaccinationRecords);
userVaccinationRouter.get('/vaccination-record/:id', getVaccinationRecordById);
userVaccinationRouter.delete('/delete-vaccination-record/:id', deleteVaccinationRecord);   

export default userVaccinationRouter;
