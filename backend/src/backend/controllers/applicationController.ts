import { Request, Response } from 'express';
import Application from '../models/Application';

export const getAllApplications = async (req: Request, res: Response) => {
  try {
    const applications = await Application.find({ developerId: (req as any).developerId });
    res.json(applications);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch applications' });
  }
};

export const getApplicationByName = async (req: Request, res: Response) => {
  try {
    const application = await Application.findOne({ 
      name: req.params.name,
      developerId: (req as any).developerId
    });
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json(application);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch application' });
  }
};

export const createApplication = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    
    const existingApp = await Application.findOne({ name });
    if (existingApp) {
      return res.status(400).json({ error: 'Application name already exists' });
    }
    
    const application = await Application.create({
      name,
      developerId: (req as any).developerId
    });
    
    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Failed to create application' });
  }
};

export const deleteApplication = async (req: Request, res: Response) => {
  try {
    const application = await Application.findOneAndDelete({ 
      name: req.params.name,
      developerId: (req as any).developerId
    });
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete application' });
  }
};