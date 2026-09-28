// The randomizer's screen ([[randomizer§9]]): the dice roller above a divider,
// then the item rows and "Randomize". Every rule comes from the toy's cores;
// the screen only shows them. Saved lists ([[randomizer§6]]) are not built yet.

import { useEffect, useRef, useState, type JSX } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '../../../src/presentation/components/Button';
import { color, font, radius, spacing } from '../../../src/presentation/tokens';
import { isFacesEntry, isQuantityEntry, roll, rollRequest } from '../core/diceRoller';
import { chances, formatChance, isMultiplierEntry, multiplierFromEntry, pick, type Item } from '../core/randomizer';
import { SPIN_MS, SpinningDie } from './SpinningDie';

const trashIcon = require('../../../assets/icons/icon-trash-simple.png');

interface Row {
  readonly key: number;
  readonly label: string;
  readonly weight: string;
}

type Shown = { readonly kind: 'none' } | { readonly kind: 'spinning' } | { readonly kind: 'text'; readonly text: string };

const NONE: Shown = { kind: 'none' };
const MIN_ROWS = 2;
const RESULT_AREA_HEIGHT = 96;
const RESULT_FONT_SIZE = 32;

/** The rows as items, or null when any weight field holds an invalid entry. */
function itemsOf(rows: readonly Row[]): Item[] | null {
  const items: Item[] = [];
  for (const row of rows) {
    const m = multiplierFromEntry(row.weight);
    if (m.kind === 'invalid-entry') return null;
    items.push({ label: row.label, multiplier: m.multiplier });
  }
  return items;
}

/** Shows `text` after the die has spun. */
function useSpinThenShow(): [Shown, (text: string) => void, (shown: Shown) => void] {
  const [shown, setShown] = useState<Shown>(NONE);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current !== null) clearTimeout(timer.current);
  }, []);
  const spinThenShow = (text: string): void => {
    setShown({ kind: 'spinning' });
    timer.current = setTimeout(() => setShown({ kind: 'text', text }), SPIN_MS);
  };
  return [shown, spinThenShow, setShown];
}

/** A fixed-height, centered space where a result, the spinning die or a warning shows. */
function ResultArea({ shown, warning }: { shown: Shown; warning?: boolean }): JSX.Element {
  return (
    <View style={styles.resultArea}>
      {shown.kind === 'spinning' ? <SpinningDie /> : null}
      {shown.kind === 'text' ? (
        <Text style={warning === true ? styles.warning : styles.result}>{shown.text}</Text>
      ) : null}
    </View>
  );
}

export function RandomizerScreen(): JSX.Element {
  const [faces, setFaces] = useState('');
  const [quantity, setQuantity] = useState('');
  const [diceWarning, setDiceWarning] = useState(false);
  const [diceShown, spinDice, setDiceShown] = useSpinThenShow();

  const nextKey = useRef(MIN_ROWS);
  const [rows, setRows] = useState<Row[]>([
    { key: 0, label: '', weight: '' },
    { key: 1, label: '', weight: '' },
  ]);
  const [pickWarning, setPickWarning] = useState(false);
  const [pickShown, spinPick, setPickShown] = useSpinThenShow();

  const items = itemsOf(rows);
  const shownChances = items === null ? null : chances(items);

  const onRoll = (): void => {
    const request = rollRequest(faces, quantity);
    setDiceWarning(request.kind === 'invalid-entry');
    if (request.kind !== 'roll') {
      setDiceShown(NONE);
      return;
    }
    const randoms = Array.from({ length: request.quantity }, () => Math.random());
    spinDice(roll(request.faces, randoms).join(', '));
  };

  const onRandomize = (): void => {
    if (items === null) {
      setPickWarning(true);
      setPickShown({ kind: 'text', text: 'Invalid entry' });
      return;
    }
    setPickWarning(false);
    const result = pick(items, Math.random());
    if (result.kind === 'no-viable-options') {
      setPickShown({ kind: 'text', text: 'No viable options remain.' });
      return;
    }
    spinPick(items[result.index]?.label ?? '');
  };

  const setRow = (key: number, change: Partial<Row>): void => {
    setRows((current) => current.map((r) => (r.key === key ? { ...r, ...change } : r)));
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <ResultArea shown={diceWarning ? { kind: 'text', text: 'Invalid entry' } : diceShown} warning={diceWarning} />
      <View style={styles.diceRow}>
        <Text style={styles.fieldLabel}>Faces:</Text>
        <TextInput
          style={[styles.field, styles.diceField]}
          value={faces}
          keyboardType="number-pad"
          onChangeText={(t) => {
            if (isFacesEntry(t)) setFaces(t);
          }}
        />
        <Text style={styles.fieldLabel}>Quantity:</Text>
        <TextInput
          style={[styles.field, styles.diceField]}
          value={quantity}
          keyboardType="number-pad"
          onChangeText={(t) => {
            if (isQuantityEntry(t)) setQuantity(t);
          }}
        />
        <Button label="Roll" onPress={onRoll} disabled={diceShown.kind === 'spinning'} />
      </View>

      <View style={styles.divider} />

      <ResultArea shown={pickShown} warning={pickWarning} />

      {rows.map((row, index) => (
        <View key={row.key} style={styles.itemRow}>
          <TextInput
            style={[styles.field, styles.labelField]}
            value={row.label}
            placeholder="Item"
            onChangeText={(t) => setRow(row.key, { label: t })}
          />
          <TextInput
            style={[styles.field, styles.weightField]}
            value={row.weight}
            placeholder="1.0"
            keyboardType="decimal-pad"
            onChangeText={(t) => {
              if (isMultiplierEntry(t)) setRow(row.key, { weight: t });
            }}
          />
          <Text style={styles.chance}>
            {shownChances !== null && shownChances.kind === 'chances' ? formatChance(shownChances.chances[index] ?? 0) : ''}
          </Text>
          {rows.length > MIN_ROWS ? (
            <Pressable
              onPress={() => setRows((current) => current.filter((r) => r.key !== row.key))}
              accessibilityRole="button"
              accessibilityLabel="Delete item"
            >
              <Image source={trashIcon} style={styles.trash} resizeMode="contain" />
            </Pressable>
          ) : null}
        </View>
      ))}
      <Button
        label="+ Add item"
        onPress={() => {
          const key = nextKey.current++;
          setRows((current) => [...current, { key, label: '', weight: '' }]);
        }}
      />
      <View style={styles.randomize}>
        <Button label="Randomize" onPress={onRandomize} disabled={pickShown.kind === 'spinning'} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  diceRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  fieldLabel: { fontSize: font.size.base, color: color.text, marginRight: spacing.xs },
  field: {
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: radius.sm,
    backgroundColor: color.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    fontSize: font.size.base,
    color: color.text,
  },
  diceField: { width: 56, marginRight: spacing.sm },
  resultArea: { minHeight: RESULT_AREA_HEIGHT, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm },
  result: { fontSize: RESULT_FONT_SIZE, fontWeight: font.weight.bold, color: color.text, textAlign: 'center' },
  warning: { fontSize: font.size.lg, color: color.destructiveText, textAlign: 'center' },
  divider: { borderTopWidth: 1, borderTopColor: color.divider, marginVertical: spacing.md },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  labelField: { flex: 1, marginRight: spacing.sm },
  weightField: { width: 64, marginRight: spacing.sm },
  chance: { width: 64, fontSize: font.size.base, color: color.textMuted, textAlign: 'right' },
  trash: { width: 24, height: 24, marginLeft: spacing.sm },
  randomize: { marginTop: spacing.md },
});
