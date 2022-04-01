import express, {Express} from 'express';
import cors from 'cors';

const app: Express = express();

const todoRouter = require('./routes/todoRoutes');
const AppError = require('./utils/appError');

// Middleware
app.use(cors());

app.use(express.json({limit: '10kb'}));

// Test middleware
app.use((req, res, next) => {
    // req.requestTime = new Date().toISOString();
    console.log(req.method, req.url);
    next();
});

app.use('/api/todos', todoRouter);

// Error Handling Middleware
app.all('*', (req, res, next) => {
    next(new AppError(`Can not find ${req.originalUrl} on this server`, 404));
});

module.exports = app;
