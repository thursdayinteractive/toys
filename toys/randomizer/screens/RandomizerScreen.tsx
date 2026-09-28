// The randomizer's screen: a placeholder until the screen in [[randomizer§9]] is built.

import type { JSX } from 'react';
import { StyleSheet, Text } from 'react-native';
import { color, font } from '../../../src/presentation/tokens';

export function RandomizerScreen(): JSX.Element {
  return <Text style={styles.text}>Coming soon.</Text>;
}

const styles = StyleSheet.create({
  text: { fontSize: font.size.base, color: color.text },
});
