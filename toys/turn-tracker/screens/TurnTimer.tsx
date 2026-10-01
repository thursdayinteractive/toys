// The turn timer ([[turn-tracker§2]], [[turn-tracker§4 item 3]]): one large
// element in the middle, "Start", then the time, then the dragon. The screen
// reads the clock and passes it to the core ([[§5]]).

import { useEffect, useMemo, useState, type JSX } from 'react';
import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import type { ToyScreenProps, ToyTokens } from '../../../src/toy';
import { turnView } from '../core/turnTimer';

const dragonIcon = require('../../../assets/icons/icon-dragon-head.png');

/**
 * About 1.5 cm across ([[turn-tracker§2 item 3]]), assuming about 160 screen
 * units an inch. Not yet measured on a device.
 */
const DRAGON_START = 57;
/** How often the shown time is worked out again: often enough for a flash five times a second. */
const TICK_MS = 50;
const TIME_FONT_SIZE = 120;

export type TurnTimerProps = Pick<ToyScreenProps, 'tokens' | 'Back' | 'KeepAwake' | 'Overlay'>;

export function TurnTimer({ tokens, Back, KeepAwake, Overlay }: TurnTimerProps): JSX.Element {
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const { width, height } = useWindowDimensions();
  const styles = useMemo(() => makeStyles(tokens), [tokens]);

  useEffect(() => {
    if (startedAt === null) return;
    const id = setInterval(() => setNow(Date.now()), TICK_MS);
    return () => clearInterval(id);
  }, [startedAt]);

  const startTurn = (): void => {
    const t = Date.now();
    setStartedAt(t);
    setNow(t);
  };

  const view = startedAt === null ? null : turnView(startedAt, now);
  const full = Math.min(width, height);
  const dragonSize = view?.kind === 'dragon' ? DRAGON_START + view.growth * (full - DRAGON_START) : 0;

  return (
    <Overlay orientation="landscape">
      <KeepAwake />
      <View style={styles.middle}>
        <Pressable onPress={startTurn} accessibilityRole="button">
          {view === null ? <Text style={styles.time}>Start</Text> : null}
          {view?.kind === 'time' ? <Text style={styles.time}>{view.text}</Text> : null}
          {view?.kind === 'dragon' ? (
            <Image
              source={dragonIcon}
              style={{ width: dragonSize, height: dragonSize, opacity: view.visible ? 1 : 0 }}
              resizeMode="contain"
              accessibilityLabel="Dragon"
            />
          ) : null}
        </Pressable>
      </View>
      <View style={styles.backCorner}>
        <Back />
      </View>
    </Overlay>
  );
}

function makeStyles({ color, font, spacing }: ToyTokens) {
  return StyleSheet.create({
    middle: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    time: { fontSize: TIME_FONT_SIZE, fontWeight: font.weight.bold, color: color.text, fontVariant: ['tabular-nums'] },
    backCorner: { position: 'absolute', left: spacing.md, bottom: spacing.md },
  });
}
