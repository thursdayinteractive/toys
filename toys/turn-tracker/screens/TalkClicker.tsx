// The talk clicker ([[turn-tracker§3]], [[turn-tracker§4 item 4]]): a tapping
// area in each corner, with Reset and Back small in the middle.
// The counts live only while this screen is open, so leaving resets them.

import { useMemo, useState, type JSX } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { ToyScreenProps, ToyTokens } from '../../../src/toy';
import { NO_CLICKS, click } from '../core/talkClicker';

const COUNT_FONT_SIZE = 72;
const CORNERS = [0, 1, 2, 3] as const;

export type TalkClickerProps = Pick<ToyScreenProps, 'Button' | 'tokens' | 'Back' | 'Overlay'>;

export function TalkClicker({ Button, tokens, Back, Overlay }: TalkClickerProps): JSX.Element {
  const [counts, setCounts] = useState(NO_CLICKS);
  const styles = useMemo(() => makeStyles(tokens), [tokens]);
  const corner = (i: 0 | 1 | 2 | 3): JSX.Element => (
    <Pressable
      key={i}
      style={({ pressed }) => [styles.corner, pressed ? styles.pressed : null]}
      onPress={() => setCounts((c) => click(c, i))}
      accessibilityRole="button"
      accessibilityLabel={`Counter ${i + 1}`}
    >
      <Text style={styles.count}>{counts[i]}</Text>
    </Pressable>
  );
  return (
    <Overlay orientation="landscape">
      <View style={styles.row}>{CORNERS.slice(0, 2).map(corner)}</View>
      <View style={styles.row}>{CORNERS.slice(2).map(corner)}</View>
      <View style={styles.middle} pointerEvents="box-none">
        <View style={styles.controls}>
          <Button label="Reset" variant="destructive" onPress={() => setCounts(NO_CLICKS)} />
          <Back />
        </View>
      </View>
    </Overlay>
  );
}

function makeStyles({ color, font, radius, spacing }: ToyTokens) {
  return StyleSheet.create({
    row: { flex: 1, flexDirection: 'row' },
    corner: {
      flex: 1,
      margin: spacing.sm,
      borderRadius: radius.md,
      backgroundColor: color.primaryTint,
      alignItems: 'center',
      justifyContent: 'center',
    },
    pressed: { opacity: 0.7 },
    count: { fontSize: COUNT_FONT_SIZE, fontWeight: font.weight.bold, color: color.primary, fontVariant: ['tabular-nums'] },
    middle: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, alignItems: 'center', justifyContent: 'center' },
    // A backing behind Reset and Back, so they stand clear of the corners.
    controls: { alignItems: 'center', backgroundColor: color.offWhite, borderRadius: radius.md, padding: spacing.xs },
  });
}
