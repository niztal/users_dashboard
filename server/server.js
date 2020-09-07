import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import {errorHandlingMiddleware} from './middlewares';

const app = express();

app.use(bodyParser.json());
app.use('/', routes);
app.use(errorHandlingMiddleware);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("server is up at port: " + port);
});