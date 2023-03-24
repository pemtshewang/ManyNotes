import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Index from '../routes'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import User from '../routes/userDetail'
import Error from './components/Error'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: '/users/',
        element: <User />,
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
