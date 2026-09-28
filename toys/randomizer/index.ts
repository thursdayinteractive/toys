// What the randomizer supplies to the standalone app.

import type { Toy } from '../../src/toy';
import { RandomizerScreen } from './screens/RandomizerScreen';

export const randomizer: Toy = {
  id: 'randomizer',
  title: 'The Randomizer',
  description: 'Pick one item from a weighted list, or roll dice.',
  Screen: RandomizerScreen,
};
