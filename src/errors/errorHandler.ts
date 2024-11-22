import type { NextFunction, Request, Response } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: errMsg,
  });
};

export { errorHandler };
