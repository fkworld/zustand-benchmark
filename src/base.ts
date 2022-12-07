export type CountStore = {
  count: number
  countPlus: () => void
}

export const loop = new Array(10000).fill(0)
