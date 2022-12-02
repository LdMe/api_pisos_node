import express from 'express';
import { getPrices, getProvinces, getBins, getDates, getGraph, getBars} from '../controllers/PriceController.js';


const router = express.Router();



router.get('/predict',getPrices);
router.get('/provinces',getProvinces);
router.get('/bins',getBins);
router.get('/dates',getDates);
router.post('/graph',getGraph);
router.post('/bars',getBars);
export default router;