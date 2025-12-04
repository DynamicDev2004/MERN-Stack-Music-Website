import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import appRoutes from './routes/routes'
import { Provider, useDispatch } from 'react-redux'
import store from './store/store'




createRoot(document.getElementById('root')).render(



  
  <Provider store={store}>
    <RouterProvider router={appRoutes}>
    
    </RouterProvider>

    </Provider>

)
