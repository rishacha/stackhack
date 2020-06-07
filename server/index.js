require('dotenv').config();
// Assign environment variables
const port = process.env.PORT || 4000;
const logger = require('./src/startup/logger')
const app = require('./src/server').app
app.listen(port, () => logger.info(`Listening on port ${port}`));