import * as scope from 'fndi';

import { registration } from './registry';
import { Server } from './server';

function main(resolve) {
  const server = resolve(Server);

  server.start();
}

const scopedMain = scope(registration, main);
scopedMain();
