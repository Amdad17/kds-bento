import dotenv from 'dotenv';
dotenv.config();

export const config = {
  PORT: process.env.PORT ?? 5000,
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? '*',
  MONGOOSE_URI: process.env.MONGOOSE_URI ?? "mongodb://127.0.0.1:27017/KDS",
  SKELETON_BE_URL: process.env.SKELETON_BE_URL ?? "http://localhost:4000"
}