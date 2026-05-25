export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Application {
  _id: string;
  name: string;
  developerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Log {
  _id: string;
  message: string;
  level: "INFO" | "WARN" | "ERROR";
  count: number;
  applicationId: string;
  createdAt: string;
  updatedAt: string;
}

export interface LogsResponse {
  logs: Log[];
  currentPage: number;
  totalPages: number;
  total: number;
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface DailyLogData {
  date: string;
  INFO: number;
  WARN: number;
  ERROR: number;
}
