import { Request, Response, NextFunction } from 'express';

export const get = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send(`
    <html>
      <body>
        <h1>Welcome to Fit Buddy!</h1>
        <h2>Under construction...</h2>
      </body>
    </html>
  `);
};
