import { Request, Response, NextFunction } from 'express';
import { firestore } from '../../config/firebase';
import { BaseApiResponse } from '../models/BaseApiResponse';
import { Worksheet } from '../models/Worksheet';

type BaseRouteParam = { trainingId: string };
type WorksheetRouteParam = { worksheetId: string } & BaseRouteParam;
type CreateWorksheetResponse = { worksheetId: string } & BaseApiResponse;

export const getWorksheetsByTrainingId = async (
  req: Request<BaseRouteParam, any, any, any>,
  res: Response<Worksheet[] | string>,
  next: NextFunction,
) => {
  const trainingId = req.params.trainingId;

  const dbResponse = await firestore()
    .collection('trainings')
    .doc(trainingId)
    .collection('worksheets')
    .get();

  const response: Worksheet[] = dbResponse.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      name: data.name,
      createdAt: data.createdAt.toDate(),
    };
  });

  res.status(200).json(response);
};

export const getWorksheetByWorksheetId = async (
  req: Request<WorksheetRouteParam, any, any, any>,
  res: Response<Worksheet | BaseApiResponse>,
  next: NextFunction,
) => {
  const trainingId = req.params.trainingId;
  const worksheetId = req.params.worksheetId;

  const dbResponse = await firestore()
    .collection('trainings')
    .doc(trainingId)
    .collection('worksheets')
    .doc(worksheetId)
    .get();

  const data = dbResponse.data();

  if (!data)
  {
    return res.status(404).json({ message: 'Worksheet not found' });
  }

  const response: Worksheet = {
    id: dbResponse.id,
    name: data.name,
    createdAt: data.createdAt.toDate(),
  };

  res.status(200).json(response);
};

export const createWorksheetInTraining = async (
  req: Request<BaseRouteParam, any, { name: string }, any>,
  res: Response<CreateWorksheetResponse | BaseApiResponse>,
  next: NextFunction,
) => {
  const trainingId = req.params.trainingId;
  const name = req.body.name;

  if (!name || name.trim() === '') {
    return res.status(400).json({ message: 'Name not provided' });
  }

  const training = await firestore()
    .collection('trainings')
    .doc(trainingId)
    .get();

  if (!training.exists)
  {
    return res.status(404).json({ message: 'Training not found' });
  }

  const response = await firestore()
    .collection('trainings')
    .doc(trainingId)
    .collection('worksheets')
    .add({
      name: name,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

  res.status(201).json({ message: `Worksheet created`, worksheetId: response.id });
};

export const deleteWorksheetInTraining = async (
  req: Request<WorksheetRouteParam, any, any, any>,
  res: Response<BaseApiResponse>,
  next: NextFunction,
) => {
  const trainingId = req.params.trainingId;
  const worksheetId = req.params.worksheetId;

  try {

    await firestore()
      .collection('trainings')
      .doc(trainingId)
      .collection('worksheets')
      .doc(worksheetId)
      .delete();

      res.status(202).json({ message: 'Worksheet deleted' });
  } catch (e) {
    res.status(404).json({ message: 'Worksheet not found' });
  }
};
