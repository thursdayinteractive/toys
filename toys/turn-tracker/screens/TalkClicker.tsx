// The talk clicker ([[turn-tracker§3]], [[turn-tracker§4 item 4]]): a tapping
// area in each corner, with Reset and the back arrow small in the middle.
// The counts live only while this screen is open, so leaving resets them.

import { useState, type JSX } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { ToyScreenProps } from '../../../src/toy';
import { color, font, radius, spacing } from '../../../src/presentation/tokens';
import { NO_CLICKS, click } from '../core/talkClicker';
import { BackArrow, Sideways } from './Sideways';

const COUNT_FONT_SIZE = 72;
const CORNERS = [0, 1, 2, 3] as const;

export interface TalkClickerProps {
  readonly onBack: () => void;
  readonly Button: ToyScreenProps['Button'];
}

export function TalkClicker({ onBack, Button }: TalkClickerProps): JSX.Element {
  const [counts, setCounts] = useState(NO_CLICKS);
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
    <Sideways onBack={onBack}>
      <View style={styles.row}>{CORNERS.slice(0, 2).map(corner)}</View>
      <View style={styles.row}>{CORNERS.slice(2).map(corner)}</View>
      <View style={styles.middle} pointerEvents="box-none">
        <View style={styles.controls}>
          <Button label="Reset" onPress={() => setCounts(NO_CLICKS)} />
          <BackArrow onBack={onBack} />
        </View>
      </View>
    </Sideways>
  );
}

const styles = StyleSheet.create({
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
  // A backing behind Reset and the arrow, so they stand clear of the corners.
  controls: { alignItems: 'center', backgroundColor: color.offWhite, borderRadius: radius.md, padding: spacing.xs },
});
