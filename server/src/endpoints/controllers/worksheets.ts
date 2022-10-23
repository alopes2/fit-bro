import { Worksheet } from './../models/Worksheet';
import { Repetition } from '../models/Repetition';
import { Request, Response } from 'express';
import { Exercise } from '../models/Exercise';

export const get = (req: Request, res: Response) => {
  const repetitions: Repetition[] = [
    {
      number: '11',
      weigth: 12,
    },
    {
      number: 'max',
      weigth: 7,
    },
  ];

  const exercises: Exercise[] = [
    {
      name: 'SUPINO DIRETO',
      repetitions: repetitions,
    },
  ];

  const worksheet: Worksheet = {
    id: Date.now().toString(),
    exercises: exercises,
    createdAt: new Date(),
  };

  res.json(worksheet);
};

export const createNewExercise = (req: Request, res: Response) => {};
