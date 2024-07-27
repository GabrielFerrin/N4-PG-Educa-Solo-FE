import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { DataProvider } from './context/DataContext.jsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <DataProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </DataProvider>
  </BrowserRouter>
)
