
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import trainingsRoutes from './endpoints/routes/trainings';
import homeRoutes from './endpoints/routes/home';
import { firestore } from './config/firebase';


const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use(homeRoutes);
app.use(trainingsRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
