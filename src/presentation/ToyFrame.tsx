// A running toy: the header band with ☰ back to the toy menu and the toy's
// title, above the toy's own screen.

import type { JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import type { Storage } from '../storage';
import type { Toy } from '../toy';
import { Button } from './components/Button';
import { HeaderBand } from './components/HeaderBand';
import { spacing } from './tokens';

export interface ToyFrameProps {
  readonly toy: Toy;
  readonly onMenu: () => void;
  readonly storage: Storage;
}

export function ToyFrame({ toy, onMenu, storage }: ToyFrameProps): JSX.Element {
  const { Screen } = toy;
  return (
    <View style={styles.screen}>
      <HeaderBand title={toy.title} onMenuPress={onMenu} />
      <View style={styles.content}>
        <Screen storage={storage} Button={Button} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { flex: 1, padding: spacing.md },
});
