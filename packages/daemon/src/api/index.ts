import express from 'express';
import http from 'http';
import didsRouter from './dids.router';
import vcsRouter from './vcs.router';

const app = express();
app.use('/dids', didsRouter)
app.use('/vcs', vcsRouter);

const server = http.createServer(app);
server.listen(8081);

export default server;