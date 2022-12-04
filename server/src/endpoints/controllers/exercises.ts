import { BaseApiResponse } from '../models/BaseApiResponse';
import { Exercise } from './../models/Exercise';
import { Request, Response, NextFunction } from 'express';
import { firestore } from '../../config/firebase';

type BaseRouteParam = { trainingId: string; worksheetId: string };
type ExerciseRequestParams = { exerciseId: string } & BaseRouteParam;
type CreateExerciseResponse = { exerciseId: string } & BaseApiResponse;
type SaveExerciseRequestBody = {
  name: string;
  weight: number;
};

export const GetExercises = async (
  req: Request<BaseRouteParam, any, any, any>,
  res: Response<Exercise[] | BaseApiResponse>,
  next: NextFunction,
) => {
  const { trainingId, worksheetId } = req.params;

  const firebaseResult = await firestore()
    .collection('trainings')
    .doc(trainingId)
    .collection('worksheets')
    .doc(worksheetId)
    .collection('exercises')
    .get();

  const exercises: Exercise[] = firebaseResult.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      name: data.name,
      weight: data.weight,
    };
  });

  res.status(200).json(exercises);
};

export const CreateExercises = async (
  req: Request<BaseRouteParam, any, SaveExerciseRequestBody, any>,
  res: Response<CreateExerciseResponse | BaseApiResponse>,
  next: NextFunction,
) => {
  const { trainingId, worksheetId } = req.params;
  const { name, weight } = req.body;
  if (!name || !weight)
  {
    return res.status(400).json({message: 'Name or weight not provided'});
  }

  if (weight < 0)
  {
    return res.status(400).json({message: 'Weight must not be below 0'});
  }

  const worksheetDoc = await firestore()
    .collection('trainings')
    .doc(trainingId)
    .collection('worksheets')
    .doc(worksheetId)
    .get();

  console.log(worksheetDoc.exists);

  if (!worksheetDoc.exists) {
    return res.status(404).json({ message: 'Worksheet not found' });
  }

  const addResult = await firestore()
    .collection('trainings')
    .doc(trainingId)
    .collection('worksheets')
    .doc(worksheetId)
    .collection('exercises')
    .add({
      name: name,
      weight: weight,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

  res
    .status(201)
    .json({ message: 'Exercise created', exerciseId: addResult.id });
};

export const UpdateExercises = async (
  req: Request<ExerciseRequestParams, any, SaveExerciseRequestBody, any>,
  res: Response<BaseApiResponse>,
  next: NextFunction,
) => {
  try {
    const { trainingId, worksheetId, exerciseId } = req.params;
    const { name, weight } = req.body;
    if (!name || !weight)
    {
      return res.status(400).json({message: 'Name or weight not provided'});
    }
  
    if (weight < 0)
    {
      return res.status(400).json({message: 'Weight must not be below 0'});
    }

    await firestore()
      .collection('trainings')
      .doc(trainingId)
      .collection('worksheets')
      .doc(worksheetId)
      .collection('exercises')
      .doc(exerciseId)
      .update({
        name: name,
        weight: weight,
      });

      res.status(202).json({ message: 'Exercise updated' });
  } catch (e: any) {
    res.status(404).json({ message: 'Exercise not found' });
  }
};

export const DeleteExercises = async (
  req: Request<ExerciseRequestParams, any, any, any>,
  res: Response<BaseApiResponse>,
  next: NextFunction,
) => {
  const { trainingId, worksheetId, exerciseId } = req.params;

  try {
    await firestore()
      .collection('trainings')
      .doc(trainingId)
      .collection('worksheets')
      .doc(worksheetId)
      .collection('exercises')
      .doc(exerciseId)
      .delete();

      res.status(202).json({ message: 'Exercise deleted' });
  } catch (e) {
    res.status(404).json({ message: 'Exercise not found' });
  }
};
