const rootRouter = require('./routers/root');
const authRouter = require('./routers/auth');

module.exports = (app) => {
  app.use('/auth', authRouter);
  app.use('/', rootRouter);
};
