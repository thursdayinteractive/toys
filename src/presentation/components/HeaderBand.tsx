// The header band on every screen: a left control, a centered title and the
// logo on the right, in the RogueLore colors ([[DEC-260928-roguelore-branding]]).

import type { JSX } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { color, font, radius, spacing } from '../tokens';

const headerLogo = require('../../../assets/header-logo.png');

const SLOT_SIZE = 32;

export interface HeaderBandProps {
  readonly title: string;
  /** Shows ☰ on the left, which calls this. Omitted: the slot stays empty. */
  readonly onMenuPress?: () => void;
}

export function HeaderBand({ title, onMenuPress }: HeaderBandProps): JSX.Element {
  return (
    <View style={styles.band}>
      {onMenuPress === undefined ? (
        <View style={styles.slot} />
      ) : (
        <Pressable style={styles.slot} onPress={onMenuPress} accessibilityRole="button" accessibilityLabel="Open menu">
          <Text style={styles.menuGlyph}>☰</Text>
        </Pressable>
      )}
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Image source={headerLogo} style={styles.logo} resizeMode="contain" accessibilityLabel="RogueLore" />
    </View>
  );
}

const styles = StyleSheet.create({
  band: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: color.primary,
    borderTopLeftRadius: radius.md,
    borderTopRightRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  slot: { width: SLOT_SIZE, alignItems: 'flex-start', justifyContent: 'center' },
  menuGlyph: { fontSize: font.size.xl, color: color.surface },
  title: { flex: 1, textAlign: 'center', fontSize: font.size.lg, fontWeight: font.weight.bold, color: color.surface },
  logo: { width: SLOT_SIZE, height: SLOT_SIZE },
});
