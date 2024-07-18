import { Request, Response } from 'express';
import { formatDate } from '../services/dateService';
import { getUserIdFromToken } from '../utils/security';

export const formatDateController = (req: Request, res: Response): void => {
  const { format } = req.body;

  try {
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const formattedDate = formatDate(format);
    res.status(200).json({ formattedDate, userId });
  } catch (error) {
    console.error('Error formatting date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
