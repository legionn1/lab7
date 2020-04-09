const Sequelize = require('sequelize');

const initModels = require('./models');

const {
  POSTGRES_URL,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
  POSTGRES_DATABASE,
  DATABASE_URL
} = process.env;

const connectionString = DATABASE_URL || `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_URL}/${POSTGRES_DATABASE}?schema=default`;

const db = new Sequelize(connectionString, { logging: false });

initModels(db);

module.exports = db;
