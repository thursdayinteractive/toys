// What a toy supplies to the standalone app from its own folder ([[§7 item 1]]).

import type { ComponentType } from 'react';
import type { Storage } from './storage';

/** The button a host supplies, in its own look, for a toy's screen to use. */
export interface ToyButtonProps {
  readonly label: string;
  readonly onPress: () => void;
}

/**
 * What the host passes to a toy's screen. A host passes the same `Button`
 * component on every render, so a screen's buttons keep their state.
 */
export interface ToyScreenProps {
  readonly storage: Storage;
  readonly Button: ComponentType<ToyButtonProps>;
}

export interface Toy {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly Screen: ComponentType<ToyScreenProps>;
}
