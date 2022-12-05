
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import trainingsRoutes from './endpoints/routes/trainings';
import homeRoutes from './endpoints/routes/home';

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())

app.use(homeRoutes);
app.use(trainingsRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

