// Line-level Markdown reading shared by the documentation tools.

/** Blanks out fenced code blocks and inline code spans, keeping line numbers. */
export function stripCode(text: string): string {
  const lines = text.split('\n');
  let inFence = false;
  return lines
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) {
        inFence = !inFence;
        return '';
      }
      if (inFence) return '';
      return line.replace(/`[^`\n]*`/g, (m) => ' '.repeat(m.length));
    })
    .join('\n');
}

export function wordCount(text: string): number {
  return text.split(/\s+/).filter((w) => w !== '').length;
}

/** Splits text into its front matter block (without delimiters) and body. */
export function splitFrontMatter(text: string): { frontMatter: string | null; body: string } {
  if (!text.startsWith('---\n')) return { frontMatter: null, body: text };
  const end = text.indexOf('\n---\n', 3);
  if (end === -1) return { frontMatter: null, body: text };
  return { frontMatter: text.slice(4, end), body: text.slice(end + 5) };
}

export interface Section {
  heading: string;
  text: string;
}

/** Splits a body at its level-2 headings. The text before the first is headed ''. */
export function level2Sections(body: string): Section[] {
  const sections: Section[] = [{ heading: '', text: '' }];
  for (const line of body.split('\n')) {
    const m = /^## (.+)$/.exec(line);
    if (m) sections.push({ heading: (m[1] ?? '').trim(), text: '' });
    else {
      const current = sections[sections.length - 1];
      if (current) current.text += line + '\n';
    }
  }
  return sections;
}

/** Anchors defined in bold at the start of a list item or line: `**name.**`. */
export function definedAnchors(text: string, prefix: RegExp): string[] {
  const found: string[] = [];
  for (const line of stripCode(text).split('\n')) {
    const m = /^\s*(?:[-*]\s+|\d+\.\s+)?\*\*([a-z]+-[a-z0-9-]+)\.\*\*/.exec(line);
    if (m && m[1] !== undefined && prefix.test(m[1])) found.push(m[1]);
  }
  return found;
}

export const CONFLICT_MARKER = new RegExp('^(' + '<'.repeat(7) + ' |' + '='.repeat(7) + '$|' + '>'.repeat(7) + ' )');
