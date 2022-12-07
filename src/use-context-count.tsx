import { createContext, FC, ReactElement, useCallback, useContext, useMemo, useState } from 'react'

import { CountStore } from './base'

const ContextCount = createContext<CountStore>({
  count: 0,
  countPlus: () => null,
})

export const ContextCountProvider: FC<{
  children: ReactElement
}> = (props) => {
  const [count, setCount] = useState(0)

  const countPlus = useCallback(() => {
    setCount((count) => count + 1)
  }, [setCount])

  const value = useMemo(() => {
    return { count, countPlus }
  }, [count, countPlus])

  return <ContextCount.Provider value={value}>{props.children}</ContextCount.Provider>
}

export const useContextCount = () => {
  return useContext(ContextCount)
}
