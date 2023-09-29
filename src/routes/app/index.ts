import { Router } from 'express';
 import commonRoute from './common_api';
import userRoute from './user';
// import agentRoute from './agent'



// Export the base-router
const baseRouter = Router();

// Setup routers

 baseRouter.use('/common', commonRoute)
baseRouter.use('/user', userRoute)
// baseRouter.use('/agent', agentRoute)

// Export default.
export default baseRouter;
