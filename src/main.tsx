import { createRoot } from 'react-dom/client'
import { RecoilRoot } from 'recoil'

import { TestComponent } from './test-component'
import { ContextCountProvider, useContextCount } from './use-context-count'
import { useJotaiCount } from './use-jotai-count'
import { useRecoilCount } from './use-recoil-count'
import { useZustandCount } from './use-zustand-count'

createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <ContextCountProvider>
      <App />
    </ContextCountProvider>
  </RecoilRoot>,
)

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <TestComponent name="zustand" useCount={useZustandCount} />
      <TestComponent name="jotai" useCount={useJotaiCount} />
      <TestComponent name="recoil" useCount={useRecoilCount} />
      <TestComponent name="context" useCount={useContextCount} />
    </div>
  )
}
