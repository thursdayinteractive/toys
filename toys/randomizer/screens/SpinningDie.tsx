// A die icon that spins for one second, where a result is about to show
// ([[randomizer§9 item 8]]).

import { useEffect, useRef, type JSX } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';

const dieIcon = require('../../../assets/icons/icon-d6.png');

export const SPIN_MS = 1000;

export function SpinningDie(): JSX.Element {
  const turn = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const spin = Animated.timing(turn, { toValue: 1, duration: SPIN_MS, easing: Easing.out(Easing.quad), useNativeDriver: true });
    spin.start();
    return () => spin.stop();
  }, [turn]);
  const rotate = turn.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '720deg'] });
  return <Animated.Image source={dieIcon} style={[styles.die, { transform: [{ rotate }] }]} resizeMode="contain" />;
}

const styles = StyleSheet.create({
  die: { width: 32, height: 32 },
});
