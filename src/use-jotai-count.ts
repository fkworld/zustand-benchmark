import { atom, useAtom } from 'jotai'
import { useCallback } from 'react'

const jotaiCountAtom = atom(0)

export const useJotaiCount = () => {
  const [count, setCount] = useAtom(jotaiCountAtom)

  const countPlus = useCallback(() => {
    setCount((count) => count + 1)
  }, [setCount])

  return { count, countPlus }
}
