// What a toy supplies to the standalone app from its own folder ([[§7 item 1]]).

import type { ComponentType } from 'react';
import type { Storage } from './storage';

/** What the host passes to a toy's screen. */
export interface ToyScreenProps {
  readonly storage: Storage;
}

export interface Toy {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly Screen: ComponentType<ToyScreenProps>;
}
