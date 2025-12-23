import "dotenv/config";

export default {
  development: {
    url: process.env.DATABASE_URL as string,
    dialect: "postgres",
  },
  test: {
    url: process.env.DATABASE_URL as string,
    dialect: "postgres",
  },
  production: {
    url: process.env.DATABASE_URL as string,
    dialect: "postgres",
  },
} as Record<string, any>;
