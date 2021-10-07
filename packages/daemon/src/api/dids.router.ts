import express from 'express';
import {findVcsForDid, getAllDids} from '../veramo/did-manager';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const dids = await getAllDids();
    res.json(dids);
  } catch (e) {
    next(e);
  }
});

router.get('/:did/vcs', async (req, res, next) => {
  try {
    const { did } = req.params;
    const vcs = await findVcsForDid(did);
    // dropping the envelope object that VCs are wrapped in for convenience
    res.json(vcs.map(vc => vc.verifiableCredential));
  } catch (e) {
    next(e);
  }
});

export default router;
