export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev', // could be dev, testing, or production
  mongodbUri: process.env.MONGODB_URI || 'dev',
  port: process.env.PORT || 3002,
  defaultLimit: process.env.DEFAULT_LIMIT || 7
})
