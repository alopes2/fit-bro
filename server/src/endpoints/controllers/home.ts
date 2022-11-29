import { Request, Response, NextFunction } from 'express';

export const get = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send(`
    <html>
      <head>
        <title>Fit Buddy API</title>
      </head>
      <body>
        <h1>Welcome to Fit Buddy API!</h1>
        <h2>Under construction...</h2>
      </body>
    </html>
  `);
};
