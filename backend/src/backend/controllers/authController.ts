import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Developer from '../models/Developer';
import { generateApiKey } from '../utils/generateApiKey';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    
  
    const existingUser = await Developer.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const apiKey = generateApiKey();
    
    const developer = await Developer.create({
      username,
      email,
      password: hashedPassword,
      apiKey
    });
    
    const token = jwt.sign(
      { developerId: developer._id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      token,
      apiKey,
      user: { id: developer._id, username, email }
    });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    const developer = await Developer.findOne({ email });
    if (!developer) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const isValidPassword = await bcrypt.compare(password, developer.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { developerId: developer._id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );
    
    res.json({
      token,
      apiKey: developer.apiKey,
      user: { id: developer._id, username: developer.username, email: developer.email }
    });
  } catch (error) {
    res.status(400).json({ error: 'Login failed' });
  }
};

export const logout = async (req: Request, res: Response) => {
  
  res.json({ message: 'Logged out successfully' });
};

export const getApiKey = async (req: Request, res: Response) => {
  try {
    const developer = await Developer.findById((req as any).developerId);
    if (!developer) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ apiKey: developer.apiKey });
  } catch (error) {
    res.status(400).json({ error: 'Failed to get API key' });
  }
};