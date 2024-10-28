// src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';

const FAUX_SECRET_TOKEN = 'fauxSecret123';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  if (token !== FAUX_SECRET_TOKEN) {
    res.status(403).json({ message: 'Invalid token' });
    return;
  }

  next(); // Calling next without returning any value
};