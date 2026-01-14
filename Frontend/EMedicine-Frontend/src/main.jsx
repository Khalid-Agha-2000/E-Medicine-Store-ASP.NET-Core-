import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import RouterPage from './components/RouterPage.jsx'
import {FlashMessageProvider} from './components/FlashMessageContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FlashMessageProvider>
      <RouterPage />
    </FlashMessageProvider>
  </StrictMode>,
)