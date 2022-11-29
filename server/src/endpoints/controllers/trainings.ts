import { Request, Response, NextFunction } from 'express';
import { Training } from '../models/Training';
import { firestore } from '../../config/firebase';

type TrainingPaginationQuery = { page: string; offset: string };
type GetTrainingsRequest = Request<any, any, any, TrainingPaginationQuery>;

export const getTrainings = async (
  req: GetTrainingsRequest,
  res: Response<Training[] | string>,
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
    return res.status(404).json('No trainings found');
  }

  res.status(200).json(training);
};

export const getLatestTraining = async (
  req: GetTrainingsRequest,
  res: Response<Training | string>,
  next: NextFunction,
) => {
  const data = await firestore()
    .collection('trainings')
    .orderBy('createdAt')
    .limitToLast(1)
    .get();

  const training: Training = data.docs.map((d) => {
    const data = d.data();
    const firestoreTraining: Training = {
      id: d.id,
      createdAt: data.createdAt.toDate(),
    };

    return firestoreTraining;
  })[0];

  if (!training) {
    return res.status(404).json('No trainings available yet');
  }

  res.status(200).json(training);
};

export const createNewTraining = async (
  req: Request,
  res: Response<string>,
  next: NextFunction,
) => {
  const response = await firestore().collection('trainings').add({
    createdAt: firestore.FieldValue.serverTimestamp(),
  });

  res.status(201).json(response.id);
};

type TrainingRequestParams = { id: string };
type DeleteTrainingRequest = Request<TrainingRequestParams, any, any, any>;

export const deleteTraining = async (
  req: DeleteTrainingRequest,
  res: Response<string>,
  next: NextFunction,
) => {
  const params = req.params;

  await firestore().collection('trainings').doc(params.id).delete();

  res.status(200).json('Deleted Worksheet');
};
