import helmet from 'helmet';
import cors from 'cors';
import trimmer from 'trim-request-body';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

import {
    express, httpStatus, debug
} from './config/packages';
import messages from './utils/messages';
import ApiError from './utils/error/ApiError';
import handleError from './utils/error/handleError';
import config from './config/config';
import db from './database/models';
import routers from './routes/index';

dotenv.config();

const log = debug('app:index');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// Trim request body
app.use(trimmer);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/questions', routers.questionRouter);
app.use('/api/v1/categories', routers.categoryRouter);

app.get('/', (req, res) => res.send(`<h1>${messages.root}</h1>`));

// Handle route 404
app.all('/*', (req, res, next) => {
    const err = new ApiError(messages.pageNotFound, httpStatus.NOT_FOUND, true);
    return next(err);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    if (!err.isOperational) {
        log('PROGRAMMER ERROR', err);
        process.exit(0);
    }
    handleError(err, res);
});

const { appPort = 8080 } = config;

app.listen(appPort, async () => {
    await db.sequelize.authenticate();
    log(`listening on port: ${appPort}..`);
    log('Database connected');
});

export default app;
