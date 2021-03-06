import './env';
import { initVeramo, getAllDids, getAllVcs, createDaoDid } from './veramo/did-manager';
import { IIdentifier } from "@veramo/core";
import { UniqueVerifiableCredential } from "@veramo/data-store";
import './api';
import './discord/discord-setup';

console.log('Starting Daemon...');


const main = async () => {
  await initVeramo(); // creates Daemon service DID if none exists

  // await _debugPrints();
};

const _debugPrints = async () => {
  // just some logic to demonstrate that Veramo data store works
  const identifiers = await getAllDids();
  console.log(`There are ${identifiers.length} identifiers`);
  identifiers.forEach((id: IIdentifier) => {
    console.log(id);
  });
  const vcs = await getAllVcs();
  console.log(`There are ${vcs.length} VCs`);
  vcs.forEach((vc: UniqueVerifiableCredential) => {
    console.log(vc);
  });
}

main().catch(console.error);