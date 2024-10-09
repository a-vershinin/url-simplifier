// Core
import mongoose from "mongoose";

// Utils
import { appConfig } from "../configs";

// Connect to MongoDB
export const initDatabase = async () => {
  try {
    const dbMongoUrl = `${appConfig.db.host}/${appConfig.db.dbName}`;

    await mongoose.connect(dbMongoUrl);

    console.log("Connected to MongoDB database!");
  } catch (err) {
    console.log("MongoDB Database Connection failed:", err);

    throw err;
  }
};
