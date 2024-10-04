import express from 'express';
import { test , signOutUser} from '../controllers/user.controller.js';


const router = express.Router();

router.get('/test',test);
router.post('/signout', signOutUser)


export default router;