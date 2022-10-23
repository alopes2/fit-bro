import express, { Request, Response} from 'express';
import exerciseRoutes from './endpoints/routes/exercises';

const app = express();

const port = 5000;

app.get('/', (req: Request, res: Response) => {
  res.json({msg: 'Hello'});
});

app.use('/exercises', exerciseRoutes);

app.listen(5000, () => {
  console.log(`Listening on port ${port}`);
});
