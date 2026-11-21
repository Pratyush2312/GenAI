import "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      _id: import("mongoose").Types.ObjectId;
      name: string;
      email: string;
      password?: string;
      refreshToken?: string | null;
    };
  }
}
