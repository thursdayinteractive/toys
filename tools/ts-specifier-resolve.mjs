// Resolve hook for running TypeScript directly on Node.
//
// Source files import each other with extensionless relative specifiers
// (`./weights`), the form a bundler resolves. Node's own loader needs the
// extension. For an extensionless relative specifier, this resolves to the
// sibling `.ts` file if there is one, or to the directory's `index.ts`.
// It is registered by register-test-loader.mjs for tests and the
// documentation tools, and has no effect on any bundled build.
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const EXTENSIONLESS_RELATIVE = /^\.\.?\//;
const HAS_EXTENSION = /\.[a-zA-Z0-9]+$/;

export async function resolve(specifier, context, nextResolve) {
  if (EXTENSIONLESS_RELATIVE.test(specifier) && !HAS_EXTENSION.test(specifier)) {
    const base = fileURLToPath(new URL(specifier, context.parentURL));
    if (existsSync(base + '.ts')) return nextResolve(specifier + '.ts', context);
    if (existsSync(base + '/index.ts')) return nextResolve(specifier + '/index.ts', context);
  }
  return nextResolve(specifier, context);
}
