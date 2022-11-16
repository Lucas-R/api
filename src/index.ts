import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
dotenv.config();

import personRoutes from './routes/personRoutes';

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use('/person', personRoutes);

app.get('/', (req, res) => {
  res.json({message: 'ok'});
});

mongoose.connect(String(process.env.DB))
  .then(() => {
    app.listen(process.env.port);
    console.log('server on');
  })
  .catch((error) => console.log(error));
