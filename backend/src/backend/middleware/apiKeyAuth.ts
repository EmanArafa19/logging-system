import { Request, Response, NextFunction } from 'express';
import Developer from '../models/Developer';

export const apiKeyAuth = async (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.header('x-api-key');
  
  if (!apiKey) {
    return res.status(401).json({ error: 'API key is required.' });
  }
  
  const developer = await Developer.findOne({ apiKey });
  
  if (!developer) {
    return res.status(401).json({ error: 'Invalid API key.' });
  }
  
  (req as any).developer = developer;
  next();
};