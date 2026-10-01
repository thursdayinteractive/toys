// The standalone app's button, in the toy contract's four tiers: Primary is a
// solid structural color with a white bold label, Secondary and Destructive
// are solid in their own tokens, and Link is plain clickable text
// ([[DEC-260928-roguelore-branding]]).

import type { JSX } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import type { ToyButtonProps } from '../../toy';
import { color, font, radius, spacing } from '../tokens';

export type ButtonProps = ToyButtonProps;

export function Button({ label, onPress, variant = 'primary' }: ButtonProps): JSX.Element {
  if (variant === 'link') {
    return (
      <Pressable style={({ pressed }) => [styles.link, pressed ? styles.dimmed : null]} onPress={onPress} accessibilityRole="button">
        <Text style={styles.linkLabel}>{label}</Text>
      </Pressable>
    );
  }
  return (
    <Pressable
      style={({ pressed }) => [styles.button, fills[variant], pressed ? styles.dimmed : null]}
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
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    marginTop: spacing.xs,
  },
  dimmed: { opacity: 0.7 },
  label: { fontSize: font.size.base, fontWeight: font.weight.bold, color: color.surface },
  link: { alignSelf: 'flex-start', paddingVertical: spacing.xs, marginTop: spacing.xs },
  linkLabel: { fontSize: font.size.base, fontWeight: font.weight.bold, color: color.primary },
});

const fills = StyleSheet.create({
  primary: { backgroundColor: color.primary },
  secondary: { backgroundColor: color.secondary },
  destructive: { backgroundColor: color.destructive },
});
