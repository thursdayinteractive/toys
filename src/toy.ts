// What a toy supplies to a host, and what a host supplies to a toy's screen
// ([[§7 item 1]]). A toy's folder imports only React, React Native, this
// contract and the repository's own icons, so one copy of a toy runs in the
// standalone app and in any other host.

import type { ComponentType, ReactNode } from 'react';
import type { TextStyle } from 'react-native';
import type { Storage } from './storage';

/**
 * The look of a button: Primary is the default. Link is plain clickable text.
 * DestructiveLink is the same plain text in the destructive color, for a small
 * action that discards, such as clearing a list.
 */
export type ToyButtonVariant = 'primary' | 'secondary' | 'destructive' | 'link' | 'destructiveLink';

/** The button a host supplies, in its own look, for a toy's screen to use. */
export interface ToyButtonProps {
  readonly label: string;
  readonly onPress: () => void;
  /** Omitted: Primary. */
  readonly variant?: ToyButtonVariant;
}

/**
 * The design tokens a toy's screens use. The values are plain strings and
 * numbers, so a host's own tokens satisfy this when a color or size changes;
 * font weights keep the literal values React Native's styles accept.
 */
export interface ToyTokens {
  readonly color: {
    readonly text: string;
    readonly textMuted: string;
    readonly border: string;
    readonly surface: string;
    readonly primary: string;
    readonly primaryTint: string;
    readonly destructiveText: string;
    readonly divider: string;
    readonly offWhite: string;
  };
  readonly spacing: { readonly xs: number; readonly sm: number; readonly md: number; readonly lg: number };
  readonly radius: { readonly sm: number; readonly md: number };
  readonly font: {
    readonly size: { readonly base: number; readonly lg: number };
    readonly weight: {
      readonly medium: NonNullable<TextStyle['fontWeight']>;
      readonly bold: NonNullable<TextStyle['fontWeight']>;
    };
  };
}

/** What a full-screen feature draws its content in. */
export interface ToyOverlayProps {
  /** 'landscape': the host turns the device sideways while this is open. Omitted: no change. */
  readonly orientation?: 'landscape';
  readonly children: ReactNode;
}

/**
 * What the host passes to a toy's screen. A host passes the same components
 * on every render, so a screen's state survives its re-renders.
 *
 * `Back` is the host's own exit from a full-screen feature to the shell that
 * launched the toy; a toy places it and gives it no handler. `Overlay` draws a
 * full-screen feature over the whole screen, and `KeepAwake` keeps the screen
 * on while it is rendered.
 */
export interface ToyScreenProps {
  readonly storage: Storage;
  readonly Button: ComponentType<ToyButtonProps>;
  readonly tokens: ToyTokens;
  readonly Back: ComponentType;
  readonly KeepAwake: ComponentType;
  readonly Overlay: ComponentType<ToyOverlayProps>;
}

export interface Toy {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly Screen: ComponentType<ToyScreenProps>;
}
