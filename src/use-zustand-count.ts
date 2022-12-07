import zustand from 'zustand'

import { CountStore } from './base'

export const useZustandCount = zustand<CountStore>((set) => {
  const countPlus = () => {
    set((state) => {
      return { count: state.count + 1 }
    })
  }

  return { count: 0, countPlus }
})
