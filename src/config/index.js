require('dotenv').config();

module.exports = {
  port: +process.env.PORT,
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME
  },
  adminEmail: process.env.ADMIN_EMAIL,
  jwt: {
    signature: process.env.JWT_SIGNATURE,
    expiresIn: process.env.JWT_EXPIRY
  }
};