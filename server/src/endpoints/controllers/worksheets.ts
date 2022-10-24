import { Worksheet } from './../models/Worksheet';
import { Request, Response, NextFunction } from 'express';
import { Training } from '../models/Training';

const now = new Date();

const generateRandom = () => (Math.random() * 100000000000000000).toString();

let trainings: Training[] = [
  {
    id: generateRandom(),
    worksheets: [
      {
        id: generateRandom(),
        name: 'A',
      },
      {
        id: generateRandom(),
        name: 'B',
      },
    ],
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
    worksheets: [],
  };

  trainings.push(newWorksheet);

  res.status(201).json(newWorksheet);
};

export const createNewWorksheet = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const params = req.params as TrainingRequestParams;

  const tid = params.trainingId;

  const body = req.body as CreateWorksheetRequestBody;
  const worksheetName = body.name;

  const trainingIndex = trainings.findIndex((training) => training.id === tid);

  if (trainingIndex >= 0) {
    const hasWorksheetWithSameSame = trainings[trainingIndex].worksheets.some(
      (worksheet) => worksheet.name === worksheetName,
    );

    if (hasWorksheetWithSameSame) {
      return res
        .status(400)
        .json({ message: 'Worksheet with same name already exists' });
    }

    const newWorksheet: Worksheet = {
      id: trainings[trainingIndex].worksheets.length.toString(),
      name: req.body.name,
    };

    trainings[trainingIndex].worksheets.push(newWorksheet);

    return res.status(200).json({
      message: 'Updated worksheet',
      worksheet: trainings[trainingIndex],
    });
  }

  res.status(404).json({ message: 'Training not found' });
};

export const deleteWorksheet = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const params = req.params as WorksheetRequestParams;

  const trainingIndex = trainings.findIndex(
    (training) => training.id === params.trainingId,
  );
  if (trainingIndex >= 0) {
    const hasWorksheet = trainings[trainingIndex].worksheets.some(
      (worksheet) => worksheet.id === params.worksheetId,
    );

    if (hasWorksheet) {
      trainings[trainingIndex].worksheets = trainings[trainingIndex]
        .worksheets
        .filter((w) => w.id === params.worksheetId);

      res.status(200).json({ message: 'Deleted Worksheet' });
    }
  }

  res.status(404).json({ message: 'Training not found' });
};
