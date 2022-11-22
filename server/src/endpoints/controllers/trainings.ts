import { Worksheet } from '../models/Worksheet';
import { Request, Response, NextFunction } from 'express';
import { Training } from '../models/Training';

const now = new Date();

const generateRandom = () => (Math.random() * 100000000000000000).toString();

let trainings: Training[] = [
  {
    id: generateRandom(),
    createdAt: now,
  },
];

type TrainingRequestParams = { trainingId: string };
type WorksheetRequestParams = { trainingId: string; worksheetId: string };

type CreateWorksheetRequestBody = { name: string };

export const get = (req: Request, res: Response, next: NextFunction) => {
  const worksheet = trainings.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  )[0];

  res.status(200).json(worksheet);
};

export const createNewTraining = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const newWorksheet: Training = {
    id: generateRandom(),
    createdAt: new Date(),
  };

  trainings.push(newWorksheet);

  res.status(201).json(newWorksheet);
};

export const deleteTraining = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const params = req.params as WorksheetRequestParams;

  const trainingIndex = trainings.findIndex(
    (training) => training.id === params.trainingId,
  );
  if (trainingIndex >= 0) {

      res.status(200).json({ message: 'Deleted Worksheet' });
  }

  res.status(404).json({ message: 'Training not found' });
};
