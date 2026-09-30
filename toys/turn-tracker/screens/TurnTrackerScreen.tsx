// The turn tracker's first screen ([[turn-tracker§4 item 1]]): two buttons,
// each opening its feature sideways over the whole screen.

import { useState, type JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import type { ToyScreenProps } from '../../../src/toy';
import { spacing } from '../../../src/presentation/tokens';
import { TalkClicker } from './TalkClicker';
import { TurnTimer } from './TurnTimer';

type Open = 'none' | 'timer' | 'clicker';

export function TurnTrackerScreen({ Button }: ToyScreenProps): JSX.Element {
  const [open, setOpen] = useState<Open>('none');
  const close = (): void => setOpen('none');
  return (
    <View style={styles.screen}>
      <Button label="Turn timer" onPress={() => setOpen('timer')} />
      <Button label="Talk clicker" onPress={() => setOpen('clicker')} />
      {open === 'timer' ? <TurnTimer onBack={close} /> : null}
      {open === 'clicker' ? <TalkClicker onBack={close} Button={Button} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { gap: spacing.md },
});
