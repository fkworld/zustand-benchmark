import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root') as HTMLElement).render(<App />)

function App() {
  return <div>hello react</div>
}
