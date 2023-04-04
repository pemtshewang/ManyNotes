import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Index from '../routes'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Error from './components/Error'
import UserNotePage from '../routes/userNotes'
import UserNoteList from '../routes/UserNoteList'
import CreateNote from '../routes/CreateNote'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import EditNote from '../routes/EditNote'

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
        path: 'user/:id/notes/',
        element: <UserNotePage />,
        //nest the router here
        children: [
          {
            index: true,
            element: <UserNoteList />,
          },
          {
            path: ':noteId/edit',
            element: <EditNote />,
          },
          {
            path: 'create',
            element: <CreateNote />,
          }
        ]
      }
    ]
  }
])

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}/>
    </QueryClientProvider>
  </React.StrictMode>,
)
