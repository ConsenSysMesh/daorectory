import express from 'express';
import { getAllDaoVcs, getAllPunkVcs, getAllVcs } from '../veramo/did-manager';

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

router.get('/daos', async (req, res, next) => {
  try {
    const vcs = await getAllDaoVcs();
    // dropping the envelope object that VCs are wrapped in for convenience
    res.json(vcs.map(vc => vc.verifiableCredential));
  } catch (e) {
    next(e);
  }
});

router.get('/punks', async (req, res, next) => {
  try {
    const vcs = await getAllPunkVcs();
    // dropping the envelope object that VCs are wrapped in for convenience
    res.json(vcs.map(vc => vc.verifiableCredential));
  } catch (e) {
    next(e);
  }
});

export default router;
