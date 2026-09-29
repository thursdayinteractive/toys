// The toy menu: one block per toy, with its title, its description and a
// button that opens it.

import type { JSX } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { Toy } from '../toy';
import { Button } from './components/Button';
import { HeaderBand } from './components/HeaderBand';
import { color, font, spacing } from './tokens';

export interface ToyMenuProps {
  readonly toys: readonly Toy[];
  readonly onOpen: (toy: Toy) => void;
}

export function ToyMenu({ toys, onOpen }: ToyMenuProps): JSX.Element {
  return (
    <View style={styles.screen}>
      <HeaderBand title="RogueLore Toys" />
      <ScrollView contentContainerStyle={styles.content}>
        {toys.map((toy, index) => (
          <View key={toy.id} style={[styles.toy, index > 0 ? styles.divider : null]}>
            <Text style={styles.title}>{toy.title}</Text>
            <Text style={styles.description}>{toy.description}</Text>
            <View style={styles.button}>
              <Button label="Let's roll!" onPress={() => onOpen(toy)} />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: spacing.md },
  toy: { paddingTop: spacing.lg, paddingBottom: spacing.lg },
  divider: { borderTopWidth: 1, borderTopColor: color.divider },
  title: { fontSize: font.size.lg, fontWeight: font.weight.bold, color: color.text, marginBottom: spacing.xs },
  description: { fontSize: font.size.base, color: color.text },
  button: { marginTop: spacing.sm },
});
