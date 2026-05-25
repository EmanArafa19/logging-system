import { Request, Response } from "express";
import Application from "../models/Application";
import Log from "../models/Log";

export const getAllLogs = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const { page = 1, limit = 10, sort = "recent", level, search } = req.query;

    const application = await Application.findOne({
      name,
      developerId: (req as any).developerId,
    });

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    let query: any = { applicationId: application._id };
    if (level) query.level = level;
    if (search) query.message = { $regex: search, $options: "i" };

    const sortOption = (
      sort === "count" ? { count: -1 } : { createdAt: -1 }
    ) as { [key: string]: 1 | -1 };
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);

    const logs = await Log.find(query)
      .sort(sortOption)
      .limit(limitNum)
      .skip((pageNum - 1) * limitNum);

    const total = await Log.countDocuments(query);

    res.json({
      logs,
      currentPage: pageNum,
      totalPages: Math.ceil(total / limitNum),
      total,
    });
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch logs" });
  }
};

export const createLog = async (req: Request, res: Response) => {
  try {
    const { message, level } = req.body;
    const { name } = req.params;
    const { developer } = req as any;

    const application = await Application.findOne({ name });
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    // Verify application belongs to the developer with this API key
    if (application.developerId.toString() !== developer._id.toString()) {
      return res.status(403).json({ error: "You do not own this application" });
    }

  
    const existingLog = await Log.findOne({
      message,
      level,
      applicationId: application._id,
    });

    if (existingLog) {
      existingLog.count += 1;
      await existingLog.save();
      return res.json(existingLog);
    }

    const newLog = await Log.create({
      message,
      level,
      applicationId: application._id,
      count: 1,
    });

    res.status(201).json(newLog);
  } catch (error) {
    res
      .status(400)
      .json({
        error: error instanceof Error ? error.message : "Failed to create log",
      });
  }
};
