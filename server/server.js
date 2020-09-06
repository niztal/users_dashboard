import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use('/', routes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("server is up at port: " + port);
});