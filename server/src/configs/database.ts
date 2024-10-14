export const dbConfig = {
  host: process.env.MONGODB_HOST || "",
  dbName: process.env.MONGODB_DBNAME || "",
  dbOptions: process.env.MONGODB_OPTIONS || "",
};
