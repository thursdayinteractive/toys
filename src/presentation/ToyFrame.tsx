// A running toy: the header band with ☰ back to the toy menu and the toy's
// title, above the toy's own screen.

import { useEffect, useMemo, useRef, type JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import type { Storage } from '../storage';
import type { Toy, ToyTokens } from '../toy';
import { Button } from './components/Button';
import { HeaderBand } from './components/HeaderBand';
import { makeHostServices } from './hostServices';
import { color, font, radius, spacing } from './tokens';

export interface ToyFrameProps {
  readonly toy: Toy;
  readonly onMenu: () => void;
  readonly storage: Storage;
}

const tokens: ToyTokens = { color, spacing, radius, font };

export function ToyFrame({ toy, onMenu, storage }: ToyFrameProps): JSX.Element {
  const { Screen } = toy;
  // The host components are built once for this frame, so the screen's state
  // survives re-renders; they call the latest `onMenu`.
  const exit = useRef(onMenu);
  useEffect(() => {
    exit.current = onMenu;
  });
  const { Back, KeepAwake, Overlay } = useMemo(() => makeHostServices(() => exit.current()), []);
  return (
    <View style={styles.screen}>
      <HeaderBand title={toy.title} onMenuPress={onMenu} />
      <View style={styles.content}>
        <Screen storage={storage} Button={Button} tokens={tokens} Back={Back} KeepAwake={KeepAwake} Overlay={Overlay} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { flex: 1, padding: spacing.md },
});
