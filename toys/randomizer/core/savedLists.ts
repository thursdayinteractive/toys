// Saved lists ([[randomizer§6]]): pure functions over an array of titled
// lists. The host stores the array as text through the storage interface;
// this core never touches storage. Plain data in and out ([[§3]]).

import type { Item } from './randomizer';

export interface SavedList {
  readonly title: string;
  readonly items: readonly Item[];
}

export const TITLE_MAX = 14;

/** Whether the title field may hold this text: at most 14 characters ([[randomizer§6 item 4]]). */
export function isTitleEntry(text: string): boolean {
  return text.length <= TITLE_MAX;
}

/** A title that is empty or only spaces is blank, and cannot be saved ([[randomizer§6 item 4]]). */
export function isBlankTitle(title: string): boolean {
  return title.trim() === '';
}

/** The lists with this one saved: it replaces a list of the same title, or is added at the end. */
export function saveList(lists: readonly SavedList[], list: SavedList): SavedList[] {
  const at = lists.findIndex((l) => l.title === list.title);
  return at === -1 ? [...lists, list] : lists.map((l, i) => (i === at ? list : l));
}

/** The lists without the one of this title ([[randomizer§6 item 5]]). */
export function deleteList(lists: readonly SavedList[], title: string): SavedList[] {
  return lists.filter((l) => l.title !== title);
}

export function listsToText(lists: readonly SavedList[]): string {
  return JSON.stringify(lists);
}

/** The lists saved as text, or none when nothing is saved yet. */
export function listsFromText(text: string | null): SavedList[] {
  return text === null ? [] : (JSON.parse(text) as SavedList[]);
}
