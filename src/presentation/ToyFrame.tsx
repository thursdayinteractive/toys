// A running toy: the header band with ☰ back to the toy menu and the toy's
// title, above the toy's own screen.

import type { JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import type { Toy } from '../toy';
import { HeaderBand } from './components/HeaderBand';
import { spacing } from './tokens';

export interface ToyFrameProps {
  readonly toy: Toy;
  readonly onMenu: () => void;
}

export function ToyFrame({ toy, onMenu }: ToyFrameProps): JSX.Element {
  const { Screen } = toy;
  return (
    <View style={styles.screen}>
      <HeaderBand title={toy.title} onMenuPress={onMenu} />
      <View style={styles.content}>
        <Screen />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { flex: 1, padding: spacing.md },
});
