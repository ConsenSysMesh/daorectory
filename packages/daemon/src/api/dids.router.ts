import express from 'express';
import {findVcsForDid, getAllDids} from '../veramo/did-manager';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const dids = await getAllDids();
  res.json(dids);
});

router.get('/:id/vcs', async (req, res, next) => {
  const { id } = req.params;
  const dids = await findVcsForDid(id);
  res.json(dids);
});

export default router;
