// What the turn tracker supplies to the standalone app.

import type { Toy } from '../../src/toy';
import { TurnTrackerScreen } from './screens/TurnTrackerScreen';

export const turnTracker: Toy = {
  id: 'turn-tracker',
  title: 'Your Turn',
  description: 'Help your teams share communication with a talk clicker to show who dominates the conversation or a turn timer to ensure no one does.',
  Screen: TurnTrackerScreen,
};
