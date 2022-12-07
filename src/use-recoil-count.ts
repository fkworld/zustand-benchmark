import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

import { CountStore } from './base'

const recoilCountAtom = atom({
  key: 'recoilCountAtom',
  default: 0,
})

export const useRecoilCount = (): CountStore => {
  const [count, setCount] = useRecoilState(recoilCountAtom)

  const countPlus = useCallback(() => {
    setCount((count) => count + 1)
  }, [setCount])

  return { count, countPlus }
}
