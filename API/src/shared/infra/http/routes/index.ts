import express from 'express';
import 'reflect-metadata';
import '@shared/container';
import appointmentsRoutes from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRoute from '@modules/users/infra/http/routes/Users.routes';
import sessionRouter from '@modules/users/infra/http/routes/sessionsUser.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';

const routes = express.Router();

routes.use('/sessions', sessionRouter);
routes.use('/appointments', appointmentsRoutes);
routes.use('/users', usersRoute);
routes.use('/password', passwordRouter);

export default routes;
