import express from 'express';
import 'reflect-metadata';
import '@shared/container';
import appointmentsRoutes from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRoute from '@modules/users/infra/http/routes/Users.routes';
import sessionRouter from '@modules/users/infra/http/routes/sessionsUser.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';
import rateLimiter from '../middlewares/rateLimiter';

const routes = express.Router();

routes.use('/password', passwordRouter);
routes.use('/appointments', appointmentsRoutes);
routes.use('/users', usersRoute);
routes.use(rateLimiter);
routes.use('/sessions', sessionRouter);
routes.use('/profile', profileRouter);
routes.use('/providers', providersRouter);

export default routes;
