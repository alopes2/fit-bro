import { Worksheet } from './../models/Worksheet';
import { Request, Response, NextFunction } from 'express';
import { Training } from '../models/Training';
import { firestore } from '../../config/firebase';
import { BaseApiResponse } from '../models/BaseApiResponse';

type TrainingPaginationQuery = { page: string; offset: string };
type GetTrainingsRequest = Request<any, any, any, TrainingPaginationQuery>;
type CreateTrainingResponse = { trainingId: string } & BaseApiResponse;

export const getTrainings = async (
  req: GetTrainingsRequest,
  res: Response<Training[] | BaseApiResponse>,
  next: NextFunction,
) => {
  const pagination = req.query;
  const pageQuery = Math.abs(parseInt(pagination.page));
  const offsetQuery = Math.abs(parseInt(pagination.offset));
  const page: number = (pageQuery || 1) - 1;
  const offset: number = offsetQuery || 10;

  const data = await firestore()
    .collection('trainings')
    .orderBy('createdAt')
    .limitToLast(offset)
    .offset(page * offset)
    .get();

  const training: Training[] = data.docs.map((d) => {
    const data = d.data();

    return {
      id: d.id,
      createdAt: data.createdAt.toDate(),
    };
  });

  if (training.length === 0) {
    return res.status(404).json({ message: 'No trainings found' });
  }

  res.status(200).json(training);
};

export const getLatestTraining = async (
  req: GetTrainingsRequest,
  res: Response<Training | BaseApiResponse>,
  next: NextFunction,
) => {
  const data = await firestore()
    .collection('trainings')
    .orderBy('createdAt')
    .limitToLast(1)
    .get();

  const training: Training = data.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      createdAt: data.createdAt.toDate(),
    };
  })[0];

  if (!training) {
    return res.status(404).json({ message: 'No trainings available yet' });
  }

  const worksheetsCollection = await firestore()
  .collection('trainings')
  .doc(training.id)
  .collection('worksheets')
  .get();

  const worksheets: Worksheet[] = worksheetsCollection.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      createdAt: data.createdAt.toDate(),
    }
  });

  training.worksheets = worksheets;

  res.status(200).json(training);
};

export const createNewTraining = async (
  req: Request,
  res: Response<CreateTrainingResponse>,
  next: NextFunction,
) => {
  const response = await firestore().collection('trainings').add({
    createdAt: firestore.FieldValue.serverTimestamp(),
  });

  res.status(201).json({ message: 'Training created', trainingId: response.id });
};

type TrainingRequestParams = { id: string };
type DeleteTrainingRequest = Request<TrainingRequestParams, any, any, any>;

export const deleteTraining = async (
  req: DeleteTrainingRequest,
  res: Response<BaseApiResponse>,
  next: NextFunction,
) => {
  const params = req.params;

  await firestore().collection('trainings').doc(params.id).delete();

  res.status(200).json({ message: 'Training deleted' });
};
