// The toys the standalone app contains, in menu order ([[§7 item 1]]).

import type { Toy } from './toy';
import { randomizer } from '../toys/randomizer';

export const toys: readonly Toy[] = [randomizer];
