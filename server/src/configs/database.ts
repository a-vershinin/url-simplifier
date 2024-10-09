export const dbConfig = {
  host: process.env.MONGODB_HOST || "",
  user: process.env.MONGODB_USER || "",
  password: process.env.MONGODB_PASSWORD || "",
  dbName: process.env.MONGODB_DB_NAME || "",
};
