// The storage interface every host supplies to a toy ([[§6]]), as set by the
// storage addendum: read and write text under a name.

export interface Storage {
  read(name: string): Promise<string | null>;
  write(name: string, text: string): Promise<void>;
}
