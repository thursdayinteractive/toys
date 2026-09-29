// A feature shown sideways over the whole screen, header band included
// ([[turn-tracker§4 item 2]]). It turns the device to landscape while open
// and back upright when closed.

import { useEffect, type JSX, type ReactNode } from 'react';
import { Image, Modal, Pressable, StyleSheet, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { color, spacing } from '../../../src/presentation/tokens';

const backIcon = require('../../../assets/icons/icon-nav-back-simple.png');

export interface SidewaysProps {
  readonly onBack: () => void;
  readonly children: ReactNode;
}

export function Sideways({ onBack, children }: SidewaysProps): JSX.Element {
  useEffect(() => {
    void ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => {
      void ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
  }, []);
  return (
    <Modal animationType="none" supportedOrientations={['landscape-left', 'landscape-right']} onRequestClose={onBack}>
      <View style={styles.screen}>{children}</View>
    </Modal>
  );
}

/** The small back arrow that returns to the first screen. */
export function BackArrow({ onBack }: { readonly onBack: () => void }): JSX.Element {
  return (
    <Pressable style={styles.back} onPress={onBack} accessibilityRole="button" accessibilityLabel="Back">
      <Image source={backIcon} style={styles.backIcon} resizeMode="contain" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.offWhite },
  back: { padding: spacing.sm },
  backIcon: { width: 32, height: 32 },
});
