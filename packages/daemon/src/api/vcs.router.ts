import express from 'express';
import { getAllVcs } from '../veramo/did-manager';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const vcs = await getAllVcs();
    // dropping the envelope object that VCs are wrapped in for convenience
    res.json(vcs.map(vc => vc.verifiableCredential));
  } catch (e) {
    next(e);
  }
});

export default router;
