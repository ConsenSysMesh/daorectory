import express from 'express';
import { getAllDids } from '../veramo/did-manager';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const dids = await getAllDids();
  res.json(dids);
});

export default router;
