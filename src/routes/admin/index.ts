import { Router } from 'express';
import authRouter from './auth';
import userRouter from './user';
import categoryRouter from './category';
import exploreRouter from './explore';





// Export the base-router
const adminbaseRouter = Router();

// Setup routers
adminbaseRouter.use('/auth', authRouter)
adminbaseRouter.use('/user', userRouter)
adminbaseRouter.use('/category', categoryRouter)
adminbaseRouter.use('/explore', exploreRouter)

// Export default.
export default adminbaseRouter;