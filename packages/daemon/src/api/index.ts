import express from 'express';
import cors from 'cors';
import http from 'http';
import didsRouter from './dids.router';
import vcsRouter from './vcs.router';

const app = express();
app.use(cors({
  origin: '*',
}));
app.use('/dids', didsRouter);
app.use('/vcs', vcsRouter);

const server = http.createServer(app);
server.listen(8081);

console.log('Server listening on port 8081');

export default server;