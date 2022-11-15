import express, { Request, Response} from 'express';
import exerciseRoutes from './endpoints/routes/worksheets';
import homeRoutes from './endpoints/routes/home';

const app = express();

const port = 5000;

app.use(express.json());

app.use(homeRoutes);

app.use(exerciseRoutes);

app.listen(5000, () => {
  console.log(`Listening on port ${port}`);
});
