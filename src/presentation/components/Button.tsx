// A Primary button: solid structural color, white bold label
// ([[DEC-260928-roguelore-branding]]).

import type { JSX } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { color, font, radius, spacing } from '../tokens';

export interface ButtonProps {
  readonly label: string;
  readonly onPress: () => void;
}

export function Button({ label, onPress }: ButtonProps): JSX.Element {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed ? styles.pressed : null]}
      onPress={onPress}
      accessibilityRole="button"
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    backgroundColor: color.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    marginTop: spacing.xs,
  },
  pressed: { opacity: 0.7 },
  label: { fontSize: font.size.base, fontWeight: font.weight.bold, color: color.surface },
});
