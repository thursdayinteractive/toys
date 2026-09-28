// What a toy supplies to the standalone app from its own folder ([[§7 item 1]]).

import type { ComponentType } from 'react';

export interface Toy {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly Screen: ComponentType;
}
