import express, { Request, Response} from 'express';
import exerciseRoutes from './endpoints/routes/worksheets';

const app = express();

const port = 5000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({msg: 'Hello'});
});

app.use(exerciseRoutes);

app.listen(5000, () => {
  console.log(`Listening on port ${port}`);
});
