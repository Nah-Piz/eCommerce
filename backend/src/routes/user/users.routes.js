import { Router } from 'express'
import { createUser, loginUser, logoutUser, userStatus,  } from './user.controllers.js';
import { verifyToken } from '../../utils/generateWebTokens.js';

const route = Router();

route.post('/login', loginUser);
route.post('/signup', createUser);
route.get("/logout", logoutUser);
route.get("/reload", verifyToken, userStatus);

export default route