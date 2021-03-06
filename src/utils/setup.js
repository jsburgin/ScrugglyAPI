const bodyParser = require('body-parser');
const passport = require('passport');
const { postgraphql } = require('postgraphql');
const errorHandler = require('../middleware/errors');
const configRoutes = require('../routes/config');
const auth = require('../auth');

const port = process.env.PORT || '3000';
const postgqlOptions = {
  graphiql: true,
};

/**
 * initial app configuration
 * @param  {Object} app express application
 */
const configure = (app) => {
  app.set('port', port);
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(postgraphql('postgres://localhost:5432', 'scruggly', postgqlOptions));

  // initialize authentication
  app.use(passport.initialize());
  auth.init();

  // configure routes and error handlers
  configRoutes(app);
  app.use(errorHandler);
};

/**
 * app startup
 * @param  {Object} server
 */
const start = (server) => {
  server.listen(port);

  server.on('listening', () => {});

  server.on('error', (err) => {
    throw err;
  });
};

module.exports = {
  configure,
  start,
};
