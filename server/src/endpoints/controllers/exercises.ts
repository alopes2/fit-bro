import { Repetition } from "./../models/Repetition";
import { Request, Response } from "express";
import { Exercise } from "../models/Exercise";

export const get = (req: Request, res: Response) => {
  const repetitions: Repetition[] = [
    {
      number: "11",
      weigth: 12,
    },
    {
      number: "max",
      weigth: 7,
    },
  ];

  const exercises: Exercise[] = [
    {
      name: "Supino direto",
      repetitions: repetitions,
    },
  ];

  res.json({ exercises });
};
