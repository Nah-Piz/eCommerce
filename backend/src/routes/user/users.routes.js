import { Router } from 'express'
import { createUser, loginUser,  } from './user.controllers.js';

const route = Router();

route.post('/login', loginUser);
route.post('/signup', createUser);

export default route