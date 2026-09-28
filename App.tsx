// The standalone app: the toy menu, or one running toy ([[§7 item 1]]).
// It holds none of any toy's logic.

import { useState, type JSX } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { deviceStorage } from './src/deviceStorage';
import type { Toy } from './src/toy';
import { toys } from './src/toys';
import { ToyFrame } from './src/presentation/ToyFrame';
import { ToyMenu } from './src/presentation/ToyMenu';
import { color } from './src/presentation/tokens';

export default function App(): JSX.Element {
  const [open, setOpen] = useState<Toy | null>(null);
  return (
    <SafeAreaView style={styles.container}>
      {open === null ? <ToyMenu toys={toys} onOpen={setOpen} /> : <ToyFrame toy={open} onMenu={() => setOpen(null)} storage={deviceStorage} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // SafeAreaView pads only on iOS, so Android is padded below its status bar.
  container: { flex: 1, backgroundColor: color.offWhite, paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 0 },
});
