import { FC, useState } from 'react'

import { CountStore, loop } from './base'

type Props = {
  name: string
  useCount: () => CountStore
}

export const TestComponent: FC<Props> = (props) => {
  const { name, useCount } = props

  const { count, countPlus } = useCount()

  const [read1Visible, setRead1Visible] = useState(false)
  const [read10000Visible, setRead10000Visible] = useState(false)

  const onRead1 = () => {
    setRead1Visible(true)
    setTimeout(() => setRead1Visible(false), 1000)
  }

  const onRead10000 = () => {
    setRead10000Visible(true)
    setTimeout(() => setRead10000Visible(false), 1000)
  }

  const onWrite1 = () => {
    console.time(`${name}-write1`)
    countPlus()
    console.timeEnd(`${name}-write1`)
  }

  const onWrite10000 = () => {
    console.time(`${name}-write10000`)
    loop.forEach(() => countPlus())
    console.timeEnd(`${name}-write10000`)
  }

  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {name}
      <button onClick={onRead1}>read1</button>
      <button onClick={onRead10000}>read10000</button>
      <button onClick={onWrite1}>write1</button>
      <button onClick={onWrite10000}>write10000</button>
      {count}
      {read1Visible && <Read1 {...props} />}
      {read10000Visible && <Read10000 {...props} />}
    </div>
  )
}

const Read1: FC<Props> = (props) => {
  const { name, useCount } = props
  console.time(`${name}-read1`)
  useCount()
  console.timeEnd(`${name}-read1`)
  return <div>read1</div>
}

const Read10000: FC<Props> = (props) => {
  const { name, useCount } = props
  console.time(`${name}-read10000`)
  loop.forEach(() => useCount())
  console.timeEnd(`${name}-read10000`)
  return <div>read10000</div>
}
