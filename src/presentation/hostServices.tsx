// What the standalone app supplies to a toy's screen besides storage, the
// button and the tokens ([[§7 item 1]]): Back, KeepAwake and Overlay. A toy
// imports no native package; this is the one place the standalone app does.
// Back, and Android's back key inside an overlay, exit to the toy menu.

import { useEffect, type ComponentType, type JSX } from 'react';
import { Image, Modal, Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';
import * as ScreenOrientation from 'expo-screen-orientation';
import type { ToyOverlayProps } from '../toy';
import { color, spacing } from './tokens';

const chevronIcon = require('../../assets/icons/icon-nav-chevron-simple.png');

const BACK_ICON_SIZE = 32;
// The chevron points right, so Back mirrors it. Its artwork starts 389 of
// 1331 px in from the open side, which the mirror moves to the right edge, so
// the icon shifts right by half that share to sit centered in its box.
const BACK_ICON_SHIFT = (BACK_ICON_SIZE * (389 / 1331)) / 2;

export interface HostServices {
  readonly Back: ComponentType;
  readonly KeepAwake: ComponentType;
  readonly Overlay: ComponentType<ToyOverlayProps>;
}

function logRefusedLock(error: unknown): void {
  console.warn('The device refused an orientation lock.', error);
}

function KeepAwake(): null {
  useKeepAwake();
  return null;
}

/**
 * Builds the host components once, so a screen keeps its state across
 * re-renders. `exit` is called by Back and by the overlay's back key.
 */
export function makeHostServices(exit: () => void): HostServices {
  function Back(): JSX.Element {
    return (
      <Pressable style={styles.back} onPress={exit} accessibilityRole="button" accessibilityLabel="Back">
        <View style={{ transform: [{ translateX: BACK_ICON_SHIFT }] }}>
          <Image source={chevronIcon} style={styles.backIcon} resizeMode="contain" />
        </View>
      </Pressable>
    );
  }

  function Overlay({ orientation, children }: ToyOverlayProps): JSX.Element {
    const landscape = orientation === 'landscape';
    // The app is upright; a landscape overlay locks it sideways while open and
    // puts it back upright when closed.
    useEffect(() => {
      if (!landscape) return;
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE).catch(logRefusedLock);
      return () => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP).catch(logRefusedLock);
      };
    }, [landscape]);
    return (
      <Modal
        animationType="none"
        {...(landscape ? { supportedOrientations: ['landscape-left', 'landscape-right'] as const } : {})}
        onRequestClose={exit}
      >
        <SafeAreaView style={styles.screen}>{children}</SafeAreaView>
      </Modal>
    );
  }

  return { Back, KeepAwake, Overlay };
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.offWhite },
  back: { padding: spacing.sm },
  backIcon: { width: BACK_ICON_SIZE, height: BACK_ICON_SIZE, transform: [{ scaleX: -1 }] },
});
