import * as scope from 'fndi';

import { registration } from './registry';

function main(resolve) {
  const x = 1 + 1;
}

const scopedMain = scope(registration, main);
scopedMain();
