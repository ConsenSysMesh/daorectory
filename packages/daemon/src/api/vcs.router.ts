import express from 'express';
import {
  findVcsForPunk,
  getAllDaoVcs,
  getAllPunkVcs,
  getAllVcs,
  VcTypes,
} from '../veramo/did-manager';

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

router.get('/daos/:daoId', async (req, res, next) => {
  try {
    const { daoId } = req.params;
    const vcs = await findVcsForPunk(daoId, VcTypes.DaoProfile);
    if (vcs.length === 0) {
      return res.status(404).json({ error: { message: 'DAO not found' } });
    }
    const [daoProfile] = vcs;
    // dropping the envelope object that VCs are wrapped in for convenience
    res.json(daoProfile.verifiableCredential);
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

router.get('/punks/:punkId', async (req, res, next) => {
  try {
    const { punkId } = req.params;
    const vcs = await findVcsForPunk(punkId, VcTypes.PunkProfile);
    if (vcs.length === 0) {
      return res.status(404).json({ error: { message: 'Punk not found' } });
    }
    const [punkProfile] = vcs;
    // dropping the envelope object that VCs are wrapped in for convenience
    res.json(punkProfile.verifiableCredential);
  } catch (e) {
    next(e);
  }
});

router.get('/punks/:punkId/kudos', async (req, res, next) => {
  try {
    const { punkId } = req.params;
    const [kudos, secondedKudos] = await Promise.all([
      findVcsForPunk(punkId, VcTypes.Kudos),
      findVcsForPunk(punkId, VcTypes.SecondedKudos),
    ]);
    // dropping the envelope object that VCs are wrapped in for convenience
    res.json({
      kudos: kudos.map(k => k.verifiableCredential),
      secondedKudos: secondedKudos.map(k => k.verifiableCredential),
    });
  } catch (e) {
    next(e);
  }
});

export default router;
