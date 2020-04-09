const studentRoutes = require('./students');
const groupRoutes = require('./grops');

module.exports = (app) => {
  app.use('/students', studentRoutes),
  app.use('/groups', groupRoutes);
}