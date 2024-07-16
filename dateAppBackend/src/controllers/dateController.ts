import { Request, Response } from 'express';

export const formatDate = (req: Request, res: Response) => {
  const { format } = req.body;
  const formattedDate = new Date().toLocaleDateString('en-US', { dateStyle: format });
  res.json({ formattedDate });
};
