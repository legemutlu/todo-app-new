const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Server is shutting down...');
  console.log(err);
  console.log(err.name, err.message);

  process.exit(1);
});

const app = require('./app');

dotenv.config({ path: './config.env' });

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connected successfully');
  })
  .catch((err: any) => console.error(err));

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`Api is running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Server is shutting down...');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
