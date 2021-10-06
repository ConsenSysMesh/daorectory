import express from 'express';
import { getAllVcs } from '../veramo/did-manager';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const vcs = await getAllVcs();
  res.json(vcs);
});

export default router;
