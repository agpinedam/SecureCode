import { Request, Response } from 'express';

export const formatDateController = (req: Request, res: Response) => {
  const { date } = req.body;

  if (!date) {
    return res.status(400).json({ error: 'Date is required' });
  }

  try {
    const formattedDate = formatDate(date);
    res.json({ formattedDate });
  } catch (error) {
    console.error('Error formatting date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const formatDate = (date: string): string => {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    throw new Error('Invalid date format');
  }
  return parsedDate.toLocaleDateString('en-US', {
    dateStyle: 'long', // Valores válidos: 'full', 'long', 'medium', 'short'
  });
};
