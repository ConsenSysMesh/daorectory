import express from 'express';
import {findVcsForDid, getAllDids} from '../veramo/did-manager';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const dids = await getAllDids();
  res.json(dids);
});

router.get('/:did/vcs', async (req, res, next) => {
  const { did } = req.params;
  const vcs = await findVcsForDid(did);
  // dropping the envelope object that VCs are wrapped in for convenience
  res.json(vcs.map(vc => vc.verifiableCredential));
});

export default router;
