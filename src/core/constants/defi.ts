export const DEFI_PLATFORM = {
  AAVE: 'AAVE',
  COMPOUND: 'COMPOUND',
  KAMINO: 'KAMINO',
}

export const optDeFiPlatform = Object.keys(DEFI_PLATFORM).map((key) => ({
  // @ts-ignore
  label: DEFI_PLATFORM[key],
  // @ts-ignore
  value: DEFI_PLATFORM[key],
}))