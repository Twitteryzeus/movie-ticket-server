const express = require('express');
const cors = require('cors');
const config = require('./config');
const logger = require('./utils/logger');
const { sequelize } = require('./models');
const routes = require('./modules');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/v1', routes);

// Define your routes and handlers here
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Authenticate sequelize connection here.
sequelize
  .authenticate()
  .then(() => {
    logger.info('Sequelize Authenticated Successfully');

    // After authentication is done successfully, need to sync all the models.
    sequelize
      .sync()
      .then(() => {
        logger.info('Models synced successfully');

        // After sync is completed. Start the express server.
        app.listen(config.port, () => {
          logger.info('Server is started');
          console.log(`Server is running on http://localhost:${config.port}/`);
        })
      })
      .catch((error) => {
        logger.error(`ERROR > INDEX > SEQUELIZE SYNC > ${error?.message}`);
      })
  }).catch((error) => {
    logger.error(`ERROR > INDEX > SEQUELIZE AUTHENTICATION > ${error?.message}`);
  });


