// The turn tracker's first screen ([[turn-tracker§4 item 1]]): two buttons,
// each opening its feature sideways over the whole screen.

import { useMemo, useState, type JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import type { ToyScreenProps, ToyTokens } from '../../../src/toy';
import { TalkClicker } from './TalkClicker';
import { TurnTimer } from './TurnTimer';

type Open = 'none' | 'timer' | 'clicker';

export function TurnTrackerScreen({ Button, tokens, Back, KeepAwake, Overlay }: ToyScreenProps): JSX.Element {
  const [open, setOpen] = useState<Open>('none');
  const styles = useMemo(() => makeStyles(tokens), [tokens]);
  return (
    <View style={styles.screen}>
      <Button label="Turn timer" onPress={() => setOpen('timer')} />
      <Button label="Talk clicker" onPress={() => setOpen('clicker')} />
      {open === 'timer' ? <TurnTimer tokens={tokens} Back={Back} KeepAwake={KeepAwake} Overlay={Overlay} /> : null}
      {open === 'clicker' ? <TalkClicker Button={Button} tokens={tokens} Back={Back} Overlay={Overlay} /> : null}
    </View>
  );
}

function makeStyles(tokens: ToyTokens) {
  return StyleSheet.create({
    screen: { gap: tokens.spacing.md },
  });
}
