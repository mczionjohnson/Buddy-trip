import express from 'express';

const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to Ride My Way API',
  });
});


export default indexRouter;
