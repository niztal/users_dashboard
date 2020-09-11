import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './routes';
import { errorHandlingMiddleware, authMiddleware } from './middlewares';
import {initDb} from './repository/db';

dotenv.config();
const app = express();

app.use(express.static('public'))
app.use(authMiddleware);
app.use(bodyParser.json());
app.use('/', routes);
app.use(errorHandlingMiddleware);

const port = process.env.PORT || 5000;
initDb(() => {
    app.listen(port, () => {
        console.log("server is up at port: " + port);
    });
})
