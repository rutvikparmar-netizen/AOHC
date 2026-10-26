import coreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

/**
 * Flat config. `eslint-config-next` v16 ships native flat configs, so these are
 * spread directly — `FlatCompat`/`.eslintrc` interop is no longer needed.
 */
const config = [
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'] },
  ...coreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // §20: product imagery must go through next/image for sizing and format
      // negotiation. Escape hatches need a case-by-case justification.
      '@next/next/no-img-element': 'error',
    },
  },
]

export default config
