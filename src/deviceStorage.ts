// The standalone app's storage: the device's SQLite key-value store, the same
// package the curriculum app uses ([[§6]]).

import KeyValueStore from 'expo-sqlite/kv-store';
import type { Storage } from './storage';

export const deviceStorage: Storage = {
  read: (name) => KeyValueStore.getItemAsync(name),
  write: (name, text) => KeyValueStore.setItemAsync(name, text),
};
