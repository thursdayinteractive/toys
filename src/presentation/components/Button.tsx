// A Primary button: solid structural color, white bold label
// ([[DEC-260928-roguelore-branding]]).

import type { JSX } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { color, font, radius, spacing } from '../tokens';

export interface ButtonProps {
  readonly label: string;
  readonly onPress: () => void;
  /** Dimmed and not pressable while true. */
  readonly disabled?: boolean;
}

export function Button({ label, onPress, disabled = false }: ButtonProps): JSX.Element {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed || disabled ? styles.dimmed : null]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
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
  dimmed: { opacity: 0.7 },
  label: { fontSize: font.size.base, fontWeight: font.weight.bold, color: color.surface },
});
