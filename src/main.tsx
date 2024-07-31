import App from './App.tsx'
import './index.css'
import { store } from '@/store.ts'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { Toaster } from "@/components/ui/toaster"
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </Provider>
)
