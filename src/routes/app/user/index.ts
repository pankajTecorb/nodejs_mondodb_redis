import { Router } from 'express';
import addressRoute from './address';



// Export the base-router

const baseRouter = Router();

// Setup routers
baseRouter.use('/address', addressRoute)


// Export default.
export default baseRouter;