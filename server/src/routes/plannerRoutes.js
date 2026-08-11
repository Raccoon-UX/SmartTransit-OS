import { Router } from 'express';
import { plannerController } from '../controllers/plannerController.js';

const router = Router();

// Public Multimodal Journey Planning Endpoint (No Auth Required)
router.post('/multimodal', plannerController.planMultimodalJourney);

export default router;
