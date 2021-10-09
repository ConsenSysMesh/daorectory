import express from 'express';
import cors from 'cors';
import http from 'http';
import didsRouter from './dids.router';
import vcsRouter from './vcs.router';

const URI_PREFIX = process.env.URI_PREFIX;

const app = express();
app.use(cors({
  origin: '*',
}));
app.use(`${URI_PREFIX}/api/dids`, didsRouter);
app.use(`${URI_PREFIX}/api/vcs`, vcsRouter);

const server = http.createServer(app);
server.listen(8081);

console.log(`Server listening on port 8081:${URI_PREFIX}/api`);

export default server;